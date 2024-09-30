<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VentaController extends Controller
{
    public function index() { /* Listar productos */ }
    public function show($id) { /* Mostrar un producto */ }
    public function create() { /* Formulario para crear producto */ }
    public function store(Request $request) { /* Guardar nuevo producto */ }
    public function edit($id) { /* Formulario para editar producto */ }
    public function update(Request $request, $id) { /* Actualizar producto */ }
    public function destroy($id) { /* Eliminar producto */ }
}
