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
        return response()->json($ingrediente);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadMedidaIngrediente' => 'required|max:50',
        ]);
        $ingrediente = Ingrediente::create($validatedData);

        return response()->json($ingrediente,201);
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

        return response()->json($ingrediente);
    }
    public function destroy($id) {
        $ingrediente = Ingrediente::findOrFail($id);
        $ingrediente->delete();

        return response()->json(null,204);
    }
}
