<?php

use App\Http\Controllers\IngredienteController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeccionController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\WebpayController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

Route::get('/inicio', [HomeController::class, 'index'])->name('inicio');

Route::get('/seccion/token', [SeccionController::class, 'token'])->name('seccion.token');

Route::resource('seccion', SeccionController::class);
Route::resource('ingredientes', IngredienteController::class);
Route::resource('venta', VentaController::class);

//Productos (PRIMERO LAS RUTAS ESPECIFICAS AL FINAL RESOURCE)
Route::get('/productos/filtro', [ProductoController::class, 'filtro'])->name('productos.filtro');
Route::delete('/productos/deleteo/{id}', [ProductoController::class, 'hardDelete'])->name('productos.hardDelete');
Route::put('/productos/restaurar/{id}', [ProductoController::class, 'restore'])->name('productos.restore');
Route::resource('productos', ProductoController::class);

Route::get('/prueba', [ProductoController::class, 'index']);

//Ingredientes

//Seccion

//Venta

//WebPay

Route::post('/webpay/init', [WebpayController::class, 'initTransaction'])->name('webpay.init');
Route::get('/webpay/return', [WebpayController::class, 'returnUrl'])->name('webpay.return');

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');


//VISTAS, Sin Controlador//

Route::get('/menu', function () {
    return Inertia::render('Menu');
})->name('menu');

Route::get('/aboutUs', function () {
    return Inertia::render('AboutUs');
})->name('aboutUs');

Route::get('/administracion', function () {
    return Inertia::render('Administracion');
})->name('administracion');


// DEFAULT
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
