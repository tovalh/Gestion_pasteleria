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

        // Buscar el cliente asociado al usuario
        $cliente = Cliente::where('user_id', $user->id)
            ->orWhere('CorreoCliente', $user->email)
            ->first();

        if ($cliente) {
            $pedidos = Venta::where('Clientes_idCliente', $cliente->idCliente)
                ->with(['productos'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($venta) {
                    return [
                        'id' => $venta->idVenta,
                        'numeroTransaccion' => $venta->NumeroTransaccionVenta,
                        'total' => $venta->totalVenta,
                        'estado' => $venta->estadoPedido,
                        'fecha' => $venta->created_at ? $venta->created_at->format('d/m/Y H:i') : 'N/A',
                        'metodoPago' => $venta->metodoDePagoVenta,
                        'productos' => $venta->productos->map(function ($producto) {
                            return [
                                'nombre' => $producto->NombreProducto,
                                'precio' => $producto->PrecioProducto
                            ];
                        })
                    ];
                });
        } else {
            $pedidos = [];
        }

        return Inertia::render('OrderHistory', [
            'pedidos' => $pedidos
        ]);
    }
}
