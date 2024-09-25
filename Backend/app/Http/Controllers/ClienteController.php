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
}
