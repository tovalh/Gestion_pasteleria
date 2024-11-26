<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Venta;
use App\Models\Cliente;
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
    public function create()
    {
        $productos = Producto::all();
        return Inertia::render('Ventas/ingresoVentaAdministrador', [
            'productos' => $productos
        ]);
    }
    public function show($numeroTransaccion) {
        try {
            $venta = Venta::with(['productos', 'cliente'])
                ->where('NumeroTransaccionVenta', $numeroTransaccion)
                ->firstOrFail();

            $ventaFormateada = [
                'idVenta' => $venta->idVenta,
                'NumeroTransaccionVenta' => $venta->NumeroTransaccionVenta,
                'totalVenta' => $venta->totalVenta,
                'metodoDePagoVenta' => $venta->metodoDePagoVenta,
                'estadoPedido' => $venta->estadoPedido,
                'Comentario' => $venta->Comentario,
                'fechaEntrega' => $venta->fechaEntrega, // Añadida fecha de entrega
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

    public function storeVentaAdmin(Request $request)
    {
        try {
            DB::beginTransaction();

            // Validar los datos
            $validatedData = $request->validate([
                'NombreCliente' => 'required|string|max:100',
                'CorreoCliente' => 'required|email|max:40',
                'RutCliente' => 'required|string|max:40',
                'NumeroCliente' => 'required|string|max:12',
                'DireccionCliente' => 'required|string|max:200',
                'totalVenta' => 'required|numeric',
                'metodoDePagoVenta' => 'required|string|max:45',
                'Comentario' => 'required|string|max:500',
                'productos' => 'required|array|min:1',
                'productos.*.Productos_idProducto' => 'required|exists:producto,idProducto',
                'productos.*.cantidad' => 'required|integer|min:1'
            ]);

            // Verificar stock de todos los productos antes de proceder
            foreach ($validatedData['productos'] as $producto) {
                $productoObj = Producto::findOrFail($producto['Productos_idProducto']);
                $tieneIngredientes = $productoObj->ingredientes()->count() > 0;

                if ($tieneIngredientes) {
                    // Verificar y actualizar stock para cada unidad del producto
                    for ($i = 0; $i < $producto['cantidad']; $i++) {
                        try {
                            $this->stockService->actualizarStockPorVenta($productoObj);
                        } catch (\Exception $e) {
                            throw new \Exception("Stock insuficiente para {$productoObj->NombreProducto}: " . $e->getMessage());
                        }
                    }
                }
            }

            // Crear o actualizar cliente
            $cliente = Cliente::firstOrCreate(
                ['RutCliente' => $validatedData['RutCliente']],
                [
                    'NombreCliente' => $validatedData['NombreCliente'],
                    'CorreoCliente' => $validatedData['CorreoCliente'],
                    'NumeroCliente' => $validatedData['NumeroCliente'],
                    'DireccionCliente' => $validatedData['DireccionCliente']
                ]
            );

            // Generar número de transacción único
            $ultimaVenta = Venta::orderBy('NumeroTransaccionVenta', 'desc')->first();
            $nuevoNumero = $ultimaVenta ? ($ultimaVenta->NumeroTransaccionVenta + 1) : 1000;

            // Crear la venta
            $venta = Venta::create([
                'NumeroTransaccionVenta' => $nuevoNumero,
                'totalVenta' => $validatedData['totalVenta'],
                'metodoDePagoVenta' => $validatedData['metodoDePagoVenta'],
                'Comentario' => $validatedData['Comentario'],
                'estadoPedido' => 'En Proceso',
                'Clientes_idCliente' => $cliente->idCliente
            ]);

            // Asociar productos a la venta
            foreach ($validatedData['productos'] as $producto) {
                DB::table('producto_has_venta')->insert([
                    'Productos_idProducto' => $producto['Productos_idProducto'],
                    'Venta_idVenta' => $venta->idVenta
                ]);
            }

            DB::commit();
            return redirect()->route('dashboard')->with('success', 'Venta registrada exitosamente');

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error en storeVentaAdmin:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $venta = Venta::findOrFail($id);

            $validatedData = $request->validate([
                'NumeroTransaccionVenta' => 'sometimes|numeric',
                'totalVenta' => 'sometimes|numeric',
                'metodoDePagoVenta' => 'sometimes|max:45',
                'estadoPedido' => 'sometimes|string',
                'Comentario' => 'sometimes|max:500',
            ]);

            $venta->update($validatedData);

            return redirect()->route('dashboard')->with('success', 'Estado actualizado correctamente.');
        } catch (\Exception $e) {
            return redirect()->route('dashboard')->withErrors([
                'error' => 'Error al actualizar el estado del pedido: ' . $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        $venta = Venta::findOrFail($id);
        $venta->delete();

        return redirect()->back();
    }
    public function showAdmin($id)
    {
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
                'fechaEntrega' => $venta->fechaEntrega,
                'productos' => $venta->productos->map(function($producto) use ($venta) {
                    // Obtener la cantidad directamente de la tabla pivot
                    $cantidad = DB::table('producto_has_venta')
                        ->where('Venta_idVenta', $venta->idVenta)
                        ->where('Productos_idProducto', $producto->idProducto)
                        ->value('cantidad') ?? 1;

                    return [
                        'id' => $producto->idProducto,
                        'NombreProducto' => $producto->NombreProducto,
                        'PrecioProducto' => $producto->PrecioProducto,
                        'cantidad' => $cantidad
                    ];
                }),
                'cliente' => $venta->cliente ? [
                    'id' => $venta->cliente->idCliente,
                    'nombre' => $venta->cliente->NombreCliente,
                    'email' => $venta->cliente->CorreoCliente,
                    'rut' => $venta->cliente->RutCliente,
                    'telefono' => $venta->cliente->NumeroCliente,
                    'direccion' => $venta->cliente->DireccionCliente
                ] : null
            ];

            return Inertia::render('VentaAdmin', [
                'venta' => $ventaFormateada
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return to_route('dashboard')->withErrors([
                'message' => 'No se encontró el pedido.'
            ]);
        }
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
            Log::info('Iniciando prepararCheckout');

            if (!class_exists(\App\Models\Cliente::class)) {
                Log::error('La clase Cliente no existe');
                throw new \Exception('La clase Cliente no existe');
            }

            Log::info('Datos recibidos en prepararCheckout:', [
                'request_all' => $request->all()
            ]);

            $validatedData = $request->validate([
                'productos' => 'required|array|min:1',
                'productos.*.id' => 'required|integer|exists:producto,idProducto',
                'productos.*.cantidad' => 'required|integer|min:1',
                'comentario' => 'nullable|string|max:500',
                'total' => 'required|numeric|min:0',
                'metodoPago' => 'required|string',
                'fechaEntrega' => 'required|date|after:today',
                'datosCliente' => 'required|array',
                'datosCliente.NombreCliente' => 'required|string|max:100',
                'datosCliente.CorreoCliente' => 'required|email|max:100',
                'datosCliente.RutCliente' => 'required|string|max:20',
                'datosCliente.NumeroCliente' => 'required|string|max:20',
                'datosCliente.DireccionCliente' => 'required|string|max:200',
                'datosCliente.opcionEntrega' => 'nullable|string'
            ]);


            // Si es pago en efectivo
            if ($validatedData['metodoPago'] === 'Efectivo') {
                return $this->procesarPagoEfectivo($validatedData);
            }

            // Si no es efectivo, crear cliente y guardar en sesión para WebPay
            try {
                $cliente = Cliente::firstOrCreate(
                    ['RutCliente' => $validatedData['datosCliente']['RutCliente']],
                    [
                        'NombreCliente' => $validatedData['datosCliente']['NombreCliente'],
                        'CorreoCliente' => $validatedData['datosCliente']['CorreoCliente'],
                        'NumeroCliente' => $validatedData['datosCliente']['NumeroCliente'],
                        'DireccionCliente' => $validatedData['datosCliente']['DireccionCliente'],
                        'user_id' => auth()->id()
                    ]
                );

                if (auth()->check() && !$cliente->user_id) {
                    $cliente->update(['user_id' => auth()->id()]);
                }
            } catch (\Exception $e) {
                Log::error('Error al crear cliente:', ['error' => $e->getMessage()]);
                throw $e;
            }

            session(['venta_pendiente' => [
                'productos' => $validatedData['productos'],
                'Clientes_idCliente' => $cliente->idCliente,
                'comentario' => $validatedData['comentario'],
                'total' => $validatedData['total'],
                'metodoDePagoVenta' => $validatedData['metodoPago'],
                'datosCliente' => $validatedData['datosCliente'],
                'fechaEntrega' => $validatedData['fechaEntrega'] // Añadido aquí también
            ]]);

            return response()->json([
                'checkoutUrl' => route('webpay.create')
            ]);

        } catch (\Exception $e) {
            Log::error('Error en prepararCheckout:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Error al preparar la venta',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // En VentaController.php
    protected function procesarPagoEfectivo($validatedData)
    {
        try {
            DB::beginTransaction();

            // Crear o actualizar cliente
            $cliente = Cliente::firstOrCreate(
                ['RutCliente' => $validatedData['datosCliente']['RutCliente']],
                [
                    'NombreCliente' => $validatedData['datosCliente']['NombreCliente'],
                    'CorreoCliente' => $validatedData['datosCliente']['CorreoCliente'],
                    'NumeroCliente' => $validatedData['datosCliente']['NumeroCliente'],
                    'DireccionCliente' => $validatedData['datosCliente']['DireccionCliente'],
                    'user_id' => auth()->id()
                ]
            );

            // Verificar stock de productos
            foreach ($validatedData['productos'] as $productoData) {
                $producto = Producto::findOrFail($productoData['id']);

                // Verificar y actualizar stock para la cantidad especificada
                for ($i = 0; $i < $productoData['cantidad']; $i++) {
                    try {
                        $this->stockService->actualizarStockPorVenta($producto);
                    } catch (\Exception $e) {
                        throw new \Exception("Stock insuficiente para {$producto->NombreProducto}: " . $e->getMessage());
                    }
                }
            }

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
            $venta = Venta::create([
                'NumeroTransaccionVenta' => $nuevoNumero,
                'totalVenta' => $validatedData['total'],
                'metodoDePagoVenta' => 'Efectivo',
                'Comentario' => $validatedData['comentario'] ?? '',
                'estadoPedido' => 'En Proceso',
                'Clientes_idCliente' => $cliente->idCliente,
                'fechaEntrega' => $validatedData['fechaEntrega']
            ]);

            // Asociar productos con sus cantidades
            foreach ($validatedData['productos'] as $productoData) {
                DB::table('producto_has_venta')->insert([
                    'Productos_idProducto' => $productoData['id'],
                    'Venta_idVenta' => $venta->idVenta,
                    'cantidad' => $productoData['cantidad']
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'codigoSeguimiento' => $nuevoNumero,
                'redirect' => route('seguimiento.show', ['numeroTransaccion' => $nuevoNumero])
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error en procesarPagoEfectivo:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Error al procesar el pago en efectivo',
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

            // Verificar y actualizar stock antes de crear la venta
            foreach ($ventaPendiente['productos'] as $productoData) {
                $producto = Producto::findOrFail($productoData['id']);

                // Verificar y actualizar stock para la cantidad especificada
                for ($i = 0; $i < $productoData['cantidad']; $i++) {
                    try {
                        $this->stockService->actualizarStockPorVenta($producto);
                    } catch (\Exception $e) {
                        throw new \Exception("Stock insuficiente para {$producto->NombreProducto}: " . $e->getMessage());
                    }
                }
            }

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
                'metodoDePagoVenta' => $ventaPendiente['metodoDePagoVenta'],
                'Comentario' => $ventaPendiente['comentario'],
                'Clientes_idCliente' => $ventaPendiente['Clientes_idCliente'],
                'estadoPedido' => 'En Proceso',
                'NumeroTransaccionVenta' => $nuevoNumero,
                'fechaEntrega' => $ventaPendiente['fechaEntrega']
            ];

            Log::info('Intentando crear venta con datos:', $datosVenta);

            $venta = Venta::create($datosVenta);

            // Asociar productos a la venta con sus cantidades
            foreach ($ventaPendiente['productos'] as $productoData) {
                DB::table('producto_has_venta')->insert([
                    'Productos_idProducto' => $productoData['id'],
                    'Venta_idVenta' => $venta->idVenta,
                    'cantidad' => $productoData['cantidad']
                ]);
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
