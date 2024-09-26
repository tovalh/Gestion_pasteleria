<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return view('productos.index', compact('productos'));
    }

    public function create()
    {
        return view('productos.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre_producto' => 'required|max:255',
            'descripcion' => 'required',
            'precio_unitario' => 'required|numeric|min:0',
            'stock_disponible' => 'required|integer|min:0',
        ]);

        Producto::create($validatedData);

        return redirect()->route('productos.index')
            ->with('success', 'Producto creado exitosamente.');
    }

    public function show(Producto $producto)
    {
        return view('productos.show', compact('producto'));
    }

    public function edit(Producto $producto)
    {
        return view('productos.edit', compact('producto'));
    }

    public function update(Request $request, Producto $producto)
    {
        $validatedData = $request->validate([
            'nombre_producto' => 'required|max:255',
            'descripcion' => 'required',
            'precio_unitario' => 'required|numeric|min:0',
            'stock_disponible' => 'required|integer|min:0',
        ]);

        $producto->update($validatedData);

        return redirect()->route('productos.index')
            ->with('success', 'Producto actualizado exitosamente.');
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();

        return redirect()->route('productos.index')
            ->with('success', 'Producto eliminado exitosamente.');
    }
}
