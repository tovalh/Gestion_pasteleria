<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\SoftDeletes;
use Inertia\Inertia;


class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $productos = Producto::all();
        // Determinar qué vista renderizar basado en la ruta actual
        $view = $request->routeIs('inicio') ? 'Inicio' : 'Productos/all';

        return Inertia::render($view, [
            'productos' => $productos
        ]);
    }

    public function menu()
    {
        $productos = Producto::with('seccion')->get();
        return Inertia::render('Menu', [
            'productos' => $productos
        ]);
    }

    public function mostrarProducto($id)
    {
        try {
            $producto = Producto::findOrFail($id);

            // Obtener productos relacionados de la misma sección
            $relatedProducts = Producto::where('Seccion_idSeccion', $producto->Seccion_idSeccion)
                ->where('idProducto', '!=', $id)
                ->limit(3)
                ->get();

            // Preparar datos del producto
            $productoData = [
                'idProducto' => $producto->idProducto,
                'NombreProducto' => $producto->NombreProducto,
                'DescripcionProducto' => $producto->DescripcionProducto,
                'PrecioProducto' => $producto->PrecioProducto,
                'RutaImagen' => $producto->RutaImagen,
                'Seccion_idSeccion' => $producto->Seccion_idSeccion
            ];

            return Inertia::render('ProductoDetalle', [
                'producto' => $productoData,
                'relatedProducts' => $relatedProducts
            ]);
        } catch (\Exception $e) {
            return redirect()->route('inicio')->with('error', 'Producto no encontrado');
        }
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
        $validatedData['RutaImagen'] = "";

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
