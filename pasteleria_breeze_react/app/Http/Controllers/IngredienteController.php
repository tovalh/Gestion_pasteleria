<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingrediente;
class IngredienteController extends Controller
{
    public function index()
    {
        $ingredientes = Ingrediente::all();
        return response()->json($ingredientes);

    }
    public function show($id) {
        $ingrediente = Ingrediente::findOrFail($id);
        return view('ingredientes.show', compact('ingrediente'));
    }
    public function create() {
        return view('ingredientes.create');
    }
    public function store(Request $request) {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadMedidaIngrediente' => 'required|max:50',
        ]);
        Ingrediente::create($validatedData);

        return redirect()->route('ingredientes.index')->with('success', 'Ingrediente creado exitosamente');
    }
    public function edit($id){
            $ingrediente = Ingrediente::findOrFail($id);
            return view('ingredientes.edit', compact('ingrediente'));
    }

    public function update(Request $request, $id) {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadMedidaIngrediente' => 'required|max:50',
        ]);

        $ingrediente = Ingrediente::findOrFail($id);
        $ingrediente->update($validatedData);

        return redirect()->route('ingredientes.index')->with('success', 'Ingrediente actualizado exitosamente');
    }
    public function destroy($id) {
        $ingrediente = Ingrediente::findOrFail($id);
        $ingrediente->delete();

        return redirect()->route('ingredientes.index')->with('success', 'Ingrediente eliminado exitosamente');
    }
}
