<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClienteController extends Controller
{
    //
    public function index(){
        $clientes = Cliente::all();
        return view('clientes.index', compact('clientes'));
    }

    public function create()
    {
        return view('clientes.create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre_cliente' => 'required|max:30',
            'rut' => 'required|unique:clientes|max:12',
            'numero_cliente' => 'required|max:20',
            'direccion' => 'required|max:45',
            'correo' => 'required|email|unique:clientes|max:25',
            'telefono' => 'required|max:15',
        ]);

        Cliente::create($validatedData);

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente creado exitosamente.');
    }

    public function show(Cliente $cliente)
    {
        return view('clientes.show', compact('cliente'));
    }

    public function edit(Cliente $cliente)
    {
        return view('clientes.edit', compact('cliente'));
    }

    public function update(Request $request, Cliente $cliente)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|max:255',
            'apellido' => 'required|max:255',
            'correo_electronico' => 'required|email|unique:clientes,correo_electronico,'.$cliente->id,
            'telefono' => 'required',
        ]);

        $cliente->update($validatedData);

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente actualizado exitosamente.');
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente eliminado exitosamente.');
    }

}
