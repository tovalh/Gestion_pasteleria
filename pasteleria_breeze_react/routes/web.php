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
use App\Models\Producto;
use App\Http\Controllers\HomeController;

Route::get('/inicio', [HomeController::class, 'index'])->name('inicio');

Route::get('/seccion/token', [SeccionController::class, 'token'])->name('seccion.token');

Route::resource('seccion', SeccionController::class);
//Route::resource('ingredientes', IngredienteController::class);
Route::resource('venta', VentaController::class);

//Ingredientes
Route::resource('ingredientes', IngredienteController::class);

//Productos (PRIMERO LAS RUTAS ESPECIFICAS AL FINAL RESOURCE)
//Route::get('/productos/filtro', [ProductoController::class, 'filtro'])->name('productos.filtro');
//Route::delete('/productos/deleteo/{id}', [ProductoController::class, 'hardDelete'])->name('productos.hardDelete');
//Route::put('/productos/restaurar/{id}', [ProductoController::class, 'restore'])->name('productos.restore');
//Route::resource('productos', ProductoController::class);

//productos
Route::resource('/productos', ProductoController::class);
Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
Route::get('/prueba', [ProductoController::class, 'index']);


//Seccion
Route::resource('secciones', SeccionController::class);
//Venta
Route::get('/ventas/test-page', function () {
    return Inertia::render('Ventas/Test');
});
Route::post('/ventas/test', [VentaController::class, 'store']);
Route::get('/ventas-por-periodo', [VentaController::class, 'obtenerVentasPorPeriodo'])->name('ventas.periodo');
Route::resource('ventas', VentaController::class);

//WebPay

Route::post('/venta/preparar-checkout', [VentaController::class, 'prepararCheckout'])->name('venta.prepararCheckout');
Route::post('/webpay/create', [WebpayController::class, 'initTransaction'])->name('webpay.create');
Route::get('/webpay/return', [WebpayController::class, 'returnUrl'])->name('webpay.return');

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');


//VISTAS, Sin Controlador//

Route::get('/menu', function () {
    return Inertia::render('Menu', [
        'productos' => Producto::all()
    ]);
})->name('menu');

Route::get('/aboutUs', function () {
    return Inertia::render('AboutUs');
})->name('aboutUs');

Route::get('/pago', function () {
    return Inertia::render('Pago');
})->name('pago');

Route::get('/administracion', function () {
    return Inertia::render('Administracion');
})->name('administracion');

// Ruta del Dashboard
Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

Route::get('/', function () {
    return redirect('/dashboard');
});

// DEFAULT
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/componentePrueba', [ProductoController::class, 'index'])->name('componentePrueba');

require __DIR__.'/auth.php';

