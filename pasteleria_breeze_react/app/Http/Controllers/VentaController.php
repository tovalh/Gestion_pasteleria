<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VentaController extends Controller
{
    public function index()
    {
        $ventas = Venta::all();
        return response()->json($ventas);

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
            'Clientes_idCliente' => 'required|integer|exists:clientes,idCliente',
        ]);
        $venta = Venta::create($validatedData);

        return response()->json($venta,201);
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

        return response()->json($venta);
    }
    public function destroy($id) {
        $venta = Venta::findOrFail($id);
        $venta->delete();

        return response()->json(null,204);
    }
    public function hardDelete($id){
        $venta = Venta::findOrFail($id);
        $venta->forceDelete();

        return response()->json(null,204);
    }

    public function restore($id){
        $venta = Venta::withTrashed()->findOrFail($id);
        $venta->restore();

        return response()->json(null,204);
    }
}

