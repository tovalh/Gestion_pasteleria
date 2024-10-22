<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\SoftDeletes;
use Inertia\Inertia;


class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return Inertia::render('Productos/all', ['productos' => $productos]);
    }
    public function create()
    {
        return Inertia::render('Productos/Create');
    }

    public function show($id) {
        $producto = Producto::findOrFail($id);
        return Inertia::render('Productos/Show', ['producto' => $producto]);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'NombreProducto' => 'required|max:35',
            'DescripcionProducto' => 'required',
            'PrecioProducto' => 'required|max:12',
            'Seccion_idSeccion' => 'required|integer|exists:seccion,idSeccion',
        ]);

        $producto = Producto::create($validatedData);

        // Redirigir al dashboard con mensaje de éxito
        return redirect()->route('dashboard')->with('message', 'Producto creado con éxito');
    }
    public function edit($id)
    {
        $producto = Producto::findOrFail($id);
        return Inertia::render('Productos/Edit', ['productos' => $producto]);
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

        return redirect()->back();
    }
    //Borrado Logico
    public function destroy($id) {
        $producto = Producto::findOrFail($id);
        $producto->delete();

        return redirect()->back();
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

        return redirect()->back();
    }

    public function restore($id){
        $producto = Producto::withTrashed()->findOrFail($id);
        $producto->restore();

        return redirect()->back();
    }
}
