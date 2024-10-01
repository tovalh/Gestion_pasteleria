<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return response()->json($productos);

    }
    public function show($id) {
        $producto = Producto::findOrFail($id);
        return response()->json($producto);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadMedidaIngrediente' => 'required|max:50',
        ]);
        $producto = Producto::create($validatedData);

        return response()->json($producto,201);
    }

    public function update(Request $request, $id) {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadMedidaIngrediente' => 'required|max:50',
        ]);

        $producto = Producto::findOrFail($id);
        $producto->update($validatedData);

        return response()->json($producto);
    }
    public function destroy($id) {
        $producto = Producto::findOrFail($id);
        $producto->delete();

        return response()->json(null,204);
    }
}
