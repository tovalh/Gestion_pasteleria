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
            'NombreProducto' => 'required|max:35',
            'DescripcionProducto' => 'required',
            'PrecioProducto' => 'required|max:12',
            'Seccion_idSeccion' => 'required|integer|exists:seccion,idSeccion',
        ]);

        $producto = Producto::create($validatedData);
        return response()->json($producto,201);
    }

    public function update(Request $request, $id) {
        $validatedData = $request->validate([
            'NombreProducto' => 'required|max:35',
            'DescripcionProducto' => 'required',
            'PrecioProducto' => 'required|max:12',
            'Seccion_idSeccion' => 'required|integer|exists:seccion,idSeccion',
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
