<?php

namespace App\Http\Controllers;

use App\Models\Ingrediente;
use App\Models\Producto;
use App\Models\Seccion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $ingredientes = Ingrediente::all();
        $productos = Producto::all();
        $secciones = Seccion::all();

        return Inertia::render('Administracion', [
            'ingredientes' => $ingredientes,
            'productos' => $productos,
            'secciones' => $secciones,
        ]);
    }
}
