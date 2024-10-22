<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Ingrediente;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'productos' => Producto::all(),
            'ingredientes' => Ingrediente::all(),
            'message' => session('message')
        ]);
    }
}
