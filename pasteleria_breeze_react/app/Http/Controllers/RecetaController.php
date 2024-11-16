<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Ingrediente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RecetaController extends Controller
{
    public function edit($productoId): Response
    {
        $producto = Producto::findOrFail($productoId);
        $ingredientes = Ingrediente::all();
        $receta = $producto->ingredientes->map(function ($ingrediente) {
            return [
                'ingrediente_id' => $ingrediente->idIngrediente,
                'nombre' => $ingrediente->NombreIngrediente,
                'cantidad' => $ingrediente->pivot->cantidad,
                'unidad_medida' => $ingrediente->UnidadDeMedidaIngrediente
            ];
        });

        return Inertia::render('Productos/Receta', [
            'producto' => $producto,
            'ingredientesDisponibles' => $ingredientes,
            'recetaActual' => $receta
        ]);
    }

    public function actualizarReceta(Request $request, $productoId)
    {
        $request->validate([
            'ingredientes' => 'required|array',
            'ingredientes.*.ingrediente_id' => 'required|exists:ingrediente,idIngrediente',
            'ingredientes.*.cantidad' => 'required|numeric|min:0'
        ]);

        try {
            DB::beginTransaction();

            // Eliminar ingredientes actuales
            DB::table('producto_has_ingrediente')
                ->where('Producto_idProducto', $productoId)
                ->delete();

            // Insertar nuevos ingredientes
            foreach ($request->ingredientes as $ingrediente) {
                DB::table('producto_has_ingrediente')->insert([
                    'Producto_idProducto' => $productoId,
                    'Ingrediente_idIngrediente' => $ingrediente['ingrediente_id'],
                    'cantidad' => $ingrediente['cantidad']
                ]);
            }

            DB::commit();

            return redirect()
                ->route('dashboard')
                ->with('message', 'Receta actualizada exitosamente');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Error al actualizar la receta: ' . $e->getMessage());
        }
    }
}
