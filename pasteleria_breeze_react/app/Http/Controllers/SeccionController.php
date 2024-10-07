<?php

namespace App\Http\Controllers;

use App\Models\Seccion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeccionController extends Controller
{
    public function token()
    {
        return csrf_token();
    }
    public function index(){
        $secciones = Seccion::all();
        return Inertia::render('Menu', ['seccion' => $secciones]);
    }
    public function show($id){
        $seccion = Seccion::findOrFail($id);
        return response()->json($seccion);
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'NombreSeccion' => 'required|string|max:255|unique:seccion',
        ]);
        $seccion = Seccion::create($validatedData);

        return response()->json($seccion, 201);
    }

    /**
     * Actualizar una sección existente
     */
    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'NombreSeccion' => 'required|string|max:255|unique:seccion,NombreSeccion,' . $id . ',idSeccion',
        ]);

        $seccion = Seccion::findOrFail($id);
        $seccion->update($validatedData);

        return redirect()->back();
    }

    /**
     * Eliminar una sección
     */
    public function destroy($id){
        $seccion = Seccion::findOrFail($id);
        $seccion->delete();

        return redirect()->back();
    }

    public function hardDelete($id){
        $seccion = Seccion::findOrFail($id);
        $seccion->forceDelete();

        return redirect()->back();
    }

    public function restore($id){
        $seccion = Seccion::withTrashed()->findOrFail($id);
        $seccion->restore();

        return redirect()->back();
    }
}
