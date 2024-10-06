<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\SoftDeletes;

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
    //Borrado Logico
    public function destroy($id) {
        $producto = Producto::findOrFail($id);
        $producto->delete();

        return response()->json(null,204);
    }

    public function filtro(Request $request)
    {
        $query = Producto::query();

        // Filtro por nombre
        if ($request->has('nombre')) {
            $query->where('NombreProducto', 'like', '%' . $request->nombre . '%');
        }

        // Filtro por precio mínimo
        if ($request->has('precio_min')) {
            $query->where('PrecioProducto', '>=', $request->precio_min);
        }

        // Filtro por precio máximo
        if ($request->has('precio_max')) {
            $query->where('PrecioProducto', '<=', $request->precio_max);
        }

        // Ordenar por precio (ascendente o descendente)
        if ($request->has('orden_precio')) {
            $query->orderBy('PrecioProducto', $request->orden_precio === 'asc' ? 'asc' : 'desc');
        }

        $productos = $query->get();

        return response()->json($productos);
    }

    public function hardDelete($id){
        $producto = Producto::findOrFail($id);
        $producto->forceDelete();

        return response()->json(null,204);
    }

    public function restore($id){
        $producto = Producto::withTrashed()->findOrFail($id);
        $producto->restore();

        return response()->json(null,204);
    }
}
