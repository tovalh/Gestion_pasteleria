<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Venta;
use App\Models\Cliente;

class OrderHistoryController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Fetch all the customers associated with the user
        $customers = Cliente::where('user_id', $user->id)
            ->orWhere('CorreoCliente', $user->email)
            ->get();

        // Fetch all the orders for the associated customers
        $orders = Venta::whereIn('Clientes_idCliente', $customers->pluck('idCliente'))
            ->with(['productos'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->idVenta,
                    'numeroTransaccion' => $order->NumeroTransaccionVenta,
                    'total' => $order->totalVenta,
                    'estado' => $order->estadoPedido,
                    'fecha' => $order->created_at ? $order->created_at->format('d/m/Y H:i') : 'N/A',
                    'metodoPago' => $order->metodoDePagoVenta,
                    'productos' => $order->productos->map(function ($product) {
                        return [
                            'nombre' => $product->NombreProducto,
                            'precio' => $product->PrecioProducto
                        ];
                    })
                ];
            });

        return Inertia::render('OrderHistory', [
            'pedidos' => $orders
        ]);
    }
}
