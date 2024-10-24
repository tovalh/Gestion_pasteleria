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
        return Inertia::render('Secciones/Index', ['secciones' => $secciones]);
    }

    public function create()
    {
        return inertia::render('Secciones/Create');
    }
    public function show($id)
    {
        $seccion = Seccion::findOrFail($id);
        return Inertia::render('Secciones/Show', ['seccion' => $seccion]);
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'NombreSeccion' => 'required|string|max:255|unique:seccion',
        ]);
        $seccion = Seccion::create($validatedData);

        return redirect()->route('dashboard')->with('message', 'Sección creada con éxito');
    }

    public function edit($id)
    {
        $seccion = Seccion::findOrFail($id);
        return Inertia::render('Secciones/Edit', ['seccion' => $seccion]);
    }
    public function update(Request $request, $id){
        $validatedData = $request->validate([
            'NombreSeccion' => 'required|string|max:255|unique:seccion,NombreSeccion,' . $id . ',idSeccion',
        ]);

        $seccion = Seccion::findOrFail($id);
        $seccion->update($validatedData);

        return inertia::render('Secciones/Index', [
            'secciones' => Seccion::all(),
            'message' => 'Sección actualizada con éxito'
        ]);
    }
    public function destroy($id)
    {
        $seccion = Seccion::findOrFail($id);
        $seccion->delete();

        return inertia::render('Secciones/Index', [
            'secciones' => Seccion::all(),
            'message' => 'Sección eliminado con éxito'
        ]);
    }
}
