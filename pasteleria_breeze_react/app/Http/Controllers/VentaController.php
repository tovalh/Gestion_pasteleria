<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Http\Request;

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
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadMedidaIngrediente' => 'required|max:50',
        ]);
        $venta = Venta::create($validatedData);

        return response()->json($venta,201);
    }

    public function update(Request $request, $id) {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadMedidaIngrediente' => 'required|max:50',
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
}

