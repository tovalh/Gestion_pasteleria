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

    public function show($id)
    {
        $venta = Venta::findOrFail($id);
        return response()->json($venta);
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
            // Log de los datos recibidos
            Log::info('Datos recibidos en prepararCheckout:', [
                'request_all' => $request->all(),
                'productos' => $request->input('productos'),
            ]);

            // Validación más específica
            $validatedData = $request->validate([
                'productos' => 'required|array|min:1',
                'productos.*' => 'required|integer|exists:producto,idProducto',
                'Clientes_idCliente' => 'required|integer|exists:cliente,idCliente',
                'comentario' => 'nullable|string|max:500',
                'total' => 'required|numeric|min:0'
            ]);

            // Verificar que tenemos productos
            if (empty($validatedData['productos'])) {
                throw new \Exception('No hay productos en el carrito');
            }

            // Guardar datos en sesión para usar después del pago
            session(['venta_pendiente' => [
                'productos' => $validatedData['productos'],
                'Clientes_idCliente' => $validatedData['Clientes_idCliente'],
                'comentario' => $validatedData['comentario'],
                'total' => $validatedData['total']
            ]]);

            // Cambiar la ruta para que coincida con la definida
            return response()->json([
                'checkoutUrl' => route('webpay.create')  // Cambiado de 'webpay.init' a 'webpay.create'
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
                'metodoDePagoVenta' => 'WebPay',
                'Comentario' => $ventaPendiente['comentario'],
                'Clientes_idCliente' => $ventaPendiente['Clientes_idCliente'],
                'estadoPedido' => 'En Preparacion',
                'NumeroTransaccionVenta' => $nuevoNumero
            ];

            $venta = Venta::create($datosVenta);

            // Asociar productos y actualizar stock
            foreach ($ventaPendiente['productos'] as $productoId) {
                try {
                    $producto = Producto::findOrFail($productoId);
                    $venta->productos()->attach($productoId);

                    if (isset($this->stockService)) {
                        // Solo actualizar stock si el producto tiene ingredientes
                        $tieneIngredientes = $producto->ingredientes()->count() > 0;
                        if ($tieneIngredientes) {
                            $this->stockService->actualizarStockPorVenta($producto);
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

            // Retornar el número de seguimiento
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
