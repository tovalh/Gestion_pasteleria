<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Venta;
use App\Service\StockService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VentaController extends Controller
{
    protected $stockService;

    public function __construct(StockService $stockService)
    {
        $this->stockService = $stockService;
    }

    public function index()
    {
        $ventas = Venta::all();
        return Inertia::render('Checkout', ['ventas' => $ventas]);

    }

    public function show($id) {
        try {
            $venta = Venta::with(['productos', 'cliente'])
                ->findOrFail($id);

            $ventaFormateada = [
                'idVenta' => $venta->idVenta,
                'NumeroTransaccionVenta' => $venta->NumeroTransaccionVenta,
                'totalVenta' => $venta->totalVenta,
                'metodoDePagoVenta' => $venta->metodoDePagoVenta,
                'estadoPedido' => $venta->estadoPedido,
                'Comentario' => $venta->Comentario,
                'productos' => $venta->productos->map(function($producto) {
                    return [
                        'id' => $producto->id,
                        'NombreProducto' => $producto->NombreProducto,
                        'PrecioProducto' => $producto->PrecioProducto,
                        'cantidad' => $producto->pivot->cantidad ?? 1
                    ];
                }),
                'cliente' => $venta->cliente ? [
                    'id' => $venta->cliente->idCliente,
                    'nombre' => $venta->cliente->NombreCliente,
                    'email' => $venta->cliente->EmailCliente
                ] : null
            ];

            return Inertia::render('Pedidos/Show', [
                'venta' => $ventaFormateada
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return to_route('seguimiento')->withErrors([
                'message' => 'No se encontró el pedido. Por favor verifique el número.'
            ]);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'NumeroTransaccionVenta' => 'required|numeric',
            'totalVenta' => 'required|numeric',
            'metodoDePagoVenta' => 'required|max:45',
            'Comentario' => 'required|max:500',
            'Clientes_idCliente' => 'required|integer|exists:cliente,idCliente',
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'NumeroTransaccionVenta' => 'required|numeric',
            'totalVenta' => 'required|numeric',
            'metodoDePagoVenta' => 'required|max:45',
            'Clientes_idCliente' => 'required|integer|exists:cliente,idCliente',
        ]);

        $venta = Venta::findOrFail($id);
        $venta->update($validatedData);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $venta = Venta::findOrFail($id);
        $venta->delete();

        return redirect()->back();
    }

    public function hardDelete($id)
    {
        $venta = Venta::findOrFail($id);
        $venta->forceDelete();

        return redirect()->back();
    }

    public function restore($id)
    {
        $venta = Venta::withTrashed()->findOrFail($id);
        $venta->restore();

        return redirect()->back();
    }

    public function obtenerVentasPorPeriodo(Request $request)
    {
        $request->validate([
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date',
        ]);

        $fechaInicio = Carbon::parse($request->fechaInicio)->startOfDay();
        $fechaFin = Carbon::parse($request->fechaFin)->endOfDay();

        $ventas = Venta::whereBetween('created_at', [$fechaInicio, $fechaFin])->get();

        return Inertia::render('Ventas/Periodo', [
            'ventas' => $ventas,
            'fechaInicio' => $request->fechaInicio,
            'fechaFin' => $request->fechaFin,
        ]);
    }

    public function prepararCheckout(Request $request)
    {
        try {
            Log::info('Datos recibidos en prepararCheckout:', [
                'request_all' => $request->all(),
                'productos' => $request->input('productos'),
            ]);

            $validatedData = $request->validate([
                'productos' => 'required|array|min:1',
                'productos.*' => 'required|integer|exists:producto,idProducto',
                'Clientes_idCliente' => 'required|integer|exists:cliente,idCliente',
                'comentario' => 'nullable|string|max:500',
                'total' => 'required|numeric|min:0',
                'metodoPago' => 'required|string',
                'datosCliente' => 'required|array'
            ]);

            // Guardar datos en sesión para usar después del pago
            session(['venta_pendiente' => [
                'productos' => $validatedData['productos'],
                'Clientes_idCliente' => $validatedData['Clientes_idCliente'],
                'comentario' => $validatedData['comentario'],
                'total' => $validatedData['total'],
                'metodoDePagoVenta' => $validatedData['metodoPago'], // Asegurarse de guardar esto
                'datosCliente' => $validatedData['datosCliente']
            ]]);

            return response()->json([
                'checkoutUrl' => route('webpay.create')
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Error de validación:', [
                'errors' => $e->errors(),
                'request_data' => $request->all()
            ]);
            return response()->json([
                'error' => 'Error de validación',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error en prepararCheckout:', [
                'message' => $e->getMessage(),
                'request_data' => $request->all()
            ]);
            return response()->json([
                'error' => 'Error al preparar la venta',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function confirmarVenta(Request $request)
    {
        try {
            $ventaPendiente = session('venta_pendiente');

            if (!$ventaPendiente) {
                throw new \Exception('No se encontró una venta pendiente');
            }

            DB::beginTransaction();

            // Generar número de transacción
            $ultimaVenta = Venta::orderBy('NumeroTransaccionVenta', 'desc')->first();
            $nuevoNumero = $ultimaVenta ? ($ultimaVenta->NumeroTransaccionVenta + 1) : 1000;

            if ($nuevoNumero > 9999) {
                $nuevoNumero = 1000;
                while (Venta::where('NumeroTransaccionVenta', $nuevoNumero)->exists()) {
                    $nuevoNumero++;
                    if ($nuevoNumero > 9999) {
                        throw new \Exception('No hay números de transacción disponibles');
                    }
                }
            }

            // Crear la venta
            $datosVenta = [
                'totalVenta' => $ventaPendiente['total'],
                'metodoDePagoVenta' => $ventaPendiente['metodoDePagoVenta'], // Usar el valor guardado
                'Comentario' => $ventaPendiente['comentario'],
                'Clientes_idCliente' => $ventaPendiente['Clientes_idCliente'],
                'estadoPedido' => 'En Preparacion',
                'NumeroTransaccionVenta' => $nuevoNumero
            ];

            Log::info('Intentando crear venta con datos:', $datosVenta);

            $venta = Venta::create($datosVenta);

            // Asociar productos y actualizar stock
            foreach ($ventaPendiente['productos'] as $productoId) {
                try {
                    $producto = Producto::findOrFail($productoId);
                    $venta->productos()->attach($productoId);

                    if (isset($this->stockService)) {
                        $tieneIngredientes = $producto->ingredientes()->count() > 0;
                        if ($tieneIngredientes) {
                            $this->stockService->actualizarStockPorVenta($producto);
                        } else {
                            Log::info('Producto sin ingredientes:', [
                                'producto_id' => $productoId,
                                'nombre_producto' => $producto->NombreProducto
                            ]);
                        }
                    }
                } catch (\Exception $e) {
                    Log::error('Error procesando producto:', [
                        'producto_id' => $productoId,
                        'error' => $e->getMessage()
                    ]);
                    throw $e;
                }
            }

            DB::commit();
            session()->forget('venta_pendiente');

            return [
                'success' => true,
                'codigoSeguimiento' => $nuevoNumero
            ];

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error en confirmarVenta:', [
                'message' => $e->getMessage(),
                'ventaPendiente' => session('venta_pendiente'),
                'trace' => $e->getTraceAsString()
            ]);

            throw $e;
        }
    }
}
