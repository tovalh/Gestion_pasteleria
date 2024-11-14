<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Ingrediente;
use App\Models\Seccion;
use App\Models\Venta;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'productos' => Producto::all(),
            'ingredientes' => Ingrediente::all(),
            'secciones' => Seccion::all(),
            'ventas' => Venta::all(),
            'message' => session('message')
        ]);
    }
}
