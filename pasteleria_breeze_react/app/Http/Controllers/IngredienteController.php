<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingrediente;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Notification;


class IngredienteController extends Controller
{
    public function index()
    {
        $ingredientes = Ingrediente::all();
        return Inertia::render('Ingredientes/Index', ['ingredientes' => $ingredientes]);
    }

    public function create()
    {
        return Inertia::render('Ingredientes/Create');
    }

    public function show($id)
    {
        $ingrediente = Ingrediente::findOrFail($id);
        return Inertia::render('Ingredientes/Show', ['ingrediente' => $ingrediente]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadDeMedidaIngrediente' => 'required|max:50',
        ]);
        $ingrediente = Ingrediente::create($validatedData);

        return Inertia::render('Ingredientes/Index', [
            'ingredientes' => Ingrediente::all(),
            'message' => 'Ingrediente creado con éxito'
        ]);
    }

    public function edit($id)
    {
        $ingrediente = Ingrediente::findOrFail($id);
        return Inertia::render('Ingredientes/Edit', ['ingrediente' => $ingrediente]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'NombreIngrediente' => 'required|max:255',
            'StockIngrediente' => 'required|numeric',
            'StockMinimoIngrediente' => 'required|numeric',
            'UnidadDeMedidaIngrediente' => 'required|max:50',
        ]);

        $ingrediente = Ingrediente::findOrFail($id);
        $ingrediente->update($validatedData);

        return Inertia::render('Ingredientes/Index', [
            'ingredientes' => Ingrediente::all(),
            'message' => 'Ingrediente actualizado con éxito'
        ]);
    }

    public function destroy($id)
    {
        $ingrediente = Ingrediente::findOrFail($id);
        $ingrediente->delete();

        return Inertia::render('Ingredientes/Index', [
            'ingredientes' => Ingrediente::all(),
            'message' => 'Ingrediente eliminado con éxito'
        ]);
    }

    /**public function checkLowStock()
    {
        $ingredientesBajoStock = Ingrediente::where('StockIngrediente', '<', DB::raw('StockMinimoIngrediente'))
            ->get();

        foreach ($ingredientesBajoStock as $ingrediente) {
            $this->enviarAlerta($ingrediente);
        }

        return Inertia::render('Ingredientes/Index', [
            'ingredientes' => Ingrediente::all(),
            'ingredientesBajoStock' => $ingredientesBajoStock,
            'message' => 'Verificación de niveles de stock completada'
        ]);
    }

    private function enviarAlerta(Ingrediente $ingrediente)
    {
        // Enviar notificación a los usuarios relevantes
        $usuarios = User::where('role', 'admin')->get();

        Notification::send($usuarios, new BajoStockNotification([
            'ingrediente' => $ingrediente->NombreIngrediente,
            'stock_actual' => $ingrediente->StockIngrediente,
            'stock_minimo' => $ingrediente->StockMinimoIngrediente,
        ]));
    }
     **/
}
