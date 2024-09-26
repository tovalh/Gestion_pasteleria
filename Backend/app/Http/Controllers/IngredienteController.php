<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IngredienteController extends Controller
{
    public function index()
    {
        $ingredientes = Ingrediente::all();
        return view('ingredientes.index', compact('ingredientes'));
    }

    public function create()
    {
        return view('ingredientes.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre_ingrediente' => 'required|max:255',
            'unidad_de_medida' => 'required|max:5',
            'stock_actual' => 'required|numeric|min:0',
            'alerta_stock' => 'required|numeric|min:0',
        ]);

        Ingrediente::create($validatedData);

        return redirect()->route('ingredientes.index')
            ->with('success', 'Ingrediente creado exitosamente.');
    }

    public function show(Ingrediente $ingrediente)
    {
        return view('ingredientes.show', compact('ingrediente'));
    }

    public function edit(Ingrediente $ingrediente)
    {
        return view('ingredientes.edit', compact('ingrediente'));
    }

    public function update(Request $request, Ingrediente $ingrediente)
    {
        $validatedData = $request->validate([
            'nombre_ingrediente' => 'required|max:255',
            'unidad_de_medida' => 'required|max:50',
            'stock_actual' => 'required|numeric|min:0',
            'stock_minimo' => 'required|numeric|min:0',
        ]);

        $ingrediente->update($validatedData);

        return redirect()->route('ingredientes.index')
            ->with('success', 'Ingrediente actualizado exitosamente.');
    }

    public function destroy(Ingrediente $ingrediente)
    {
        $ingrediente->delete();

        return redirect()->route('ingredientes.index')
            ->with('success', 'Ingrediente eliminado exitosamente.');
    }

    public function checkLowStock()
    {
        $lowStockIngredientes = Ingrediente::where('stock_actual', '<=', 'stock_minimo')->get();
        return view('ingredientes.lowstock', compact('lowStockIngredientes'));
    }
}
