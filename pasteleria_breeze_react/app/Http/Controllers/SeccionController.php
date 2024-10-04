<?php

namespace App\Http\Controllers;

use App\Models\Seccion;
use Illuminate\Http\Request;

class SeccionController extends Controller
{
    public function token()
    {
        return csrf_token();
    }
    public function index()
    {
        try {
            $secciones = Seccion::all();
            return response()->json($secciones);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener las secciones',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function show($id)
    {
        try {
            $seccion = Seccion::findOrFail($id);
            return response()->json($seccion);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Sección no encontrada',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'NombreSeccion' => 'required|string|max:255|unique:seccion',
            ]);

            $seccion = Seccion::create($validatedData);
            return response()->json($seccion, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la sección',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Actualizar una sección existente
     */
    public function update(Request $request, $id)
    {
        try {
            $seccion = Seccion::findOrFail($id);

            $validatedData = $request->validate([
                'NombreSeccion' => 'required|string|max:255|unique:seccion,NombreSeccion,' . $id . ',idSeccion',
            ]);

            $seccion->update($validatedData);
            return response()->json($seccion);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar la sección',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Eliminar una sección
     */
    public function destroy($id)
    {
        try {
            $seccion = Seccion::findOrFail($id);
            $seccion->delete();
            return response()->json([
                'message' => 'Sección eliminada correctamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar la sección',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function hardDelete($id){
        $seccion = Seccion::findOrFail($id);
        $seccion->forceDelete();

        return response()->json(null,204);
    }

    public function restore($id){
        $seccion = Seccion::withTrashed()->findOrFail($id);
        $seccion->restore();

        return response()->json(null,204);
    }
}
