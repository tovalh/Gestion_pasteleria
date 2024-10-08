<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Venta;
use App\Service\StockService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $venta = Venta::findOrFail($id);
        return response()->json($venta);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'NumeroTransaccionVenta' => 'required|numeric',
            'totalVenta' => 'required|numeric',
            'metodoDePagoVenta' => 'required|max:45',
            'Comentario' => 'required|max:500',
            'Clientes_idCliente' => 'required|integer|exists:clientes,idCliente',
        ]);
    }

    public function update(Request $request, $id) {
        $validatedData = $request->validate([
            'NumeroTransaccionVenta' => 'required|numeric',
            'totalVenta' => 'required|numeric',
            'metodoDePagoVenta' => 'required|max:45',
            'Clientes_idCliente' => 'required|integer|exists:clientes,idCliente',
        ]);

        $venta = Venta::findOrFail($id);
        $venta->update($validatedData);

        return redirect()->back();
    }
    public function destroy($id) {
        $venta = Venta::findOrFail($id);
        $venta->delete();

        return redirect()->back();
    }
    public function hardDelete($id){
        $venta = Venta::findOrFail($id);
        $venta->forceDelete();

        return redirect()->back();
    }

    public function restore($id){
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
        // Validar el carrito
        $validatedData = $request->validate([
            'productos' => 'required|array',
            'productos.*' => 'exists:productos,id',
            'Clientes_idCliente' => 'required|integer|exists:clientes,idCliente',
            'comentario' => 'nullable|string|max:500',
        ]);

        // Calcular el total de la venta
        $total = 0;
        $productos = Producto::whereIn('id', $validatedData['productos'])->get();
        foreach ($productos as $producto) {
            $total += $producto->PrecioProducto;
        }

        // Guardar los datos de la venta en sesión para usarlos después del pago
        session([
            'venta_pendiente' => [
                'productos' => $validatedData['productos'],
                'Clientes_idCliente' => $validatedData['Clientes_idCliente'],
                'total' => $total,
                'comentario' => $validatedData['comentario'] ?? null,
            ]
        ]);

        // Retornar los datos necesarios para iniciar la transacción con WebPay
        return response()->json([
            'amount' => $total,
            'checkoutUrl' => route('webpay.init')
        ]);
    }

    public function confirmarVenta(Request $request)
    {
        $ventaPendiente = session('venta_pendiente');

        if (!$ventaPendiente) {
            return redirect()->route('home')->with('error', 'No se encontró una venta pendiente');
        }

        try {
            DB::beginTransaction();

            // Crear la venta
            $venta = Venta::create([
                'totalVenta' => $ventaPendiente['total'],
                'metodoDePagoVenta' => 'WebPay',
                'Comentario' => $ventaPendiente['comentario'],
                'Clientes_idCliente' => $ventaPendiente['Clientes_idCliente']
            ]);

            // Asociar productos a la venta y actualizar stock
            foreach ($ventaPendiente['productos'] as $productoId) {
                $producto = Producto::findOrFail($productoId);

                // Asociar producto con la venta
                $venta->productos()->attach($productoId);

                // Actualizar stock de ingredientes
                $this->stockService->actualizarStockPorVenta($producto);
            }

            DB::commit();

            // Limpiar la sesión
            session()->forget('venta_pendiente');

            return redirect()->route('compra.exitosa')->with('success', 'Venta realizada con éxito');
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->route('compra.fallida')->with('error', 'Error al procesar la venta: ' . $e->getMessage());
        }
    }
}

