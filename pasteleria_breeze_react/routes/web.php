<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IngredienteController;
use App\Http\Controllers\OrderHistoryController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeccionController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\WebpayController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Producto;


Route::get('/inicio', [ProductoController::class, 'index'])->name('inicio');

Route::get('/seccion/token', [SeccionController::class, 'token'])->name('seccion.token');

Route::resource('seccion', SeccionController::class);
//Route::resource('ingredientes', IngredienteController::class);
Route::resource('venta', VentaController::class);

//Ingredientes
Route::resource('ingredientes', IngredienteController::class);


Route::get('/producto/{id}', [ProductoController::class, 'mostrarProducto'])->name('producto.detalle');

//Seccion
Route::resource('secciones', SeccionController::class);

//Venta
Route::get('/ventas/test-page', function () {
    return Inertia::render('Ventas/Test');
});
Route::post('/ventas/test', [VentaController::class, 'store']);
Route::get('/ventas-por-periodo', [VentaController::class, 'obtenerVentasPorPeriodo'])->name('ventas.periodo');
Route::resource('ventas', VentaController::class);
Route::get('/seguimiento', function () {
    return Inertia::render('Seguimiento');
})->name('seguimiento');
Route::put('/ventas/{id}', [VentaController::class, 'update'])->name('ventas.update');

// Ruta para ver el pedido
Route::get('/ventas/{id}', [VentaController::class, 'show'])->name('ventas.show');

//WebPay

Route::post('/venta/preparar-checkout', [VentaController::class, 'prepararCheckout'])->name('venta.prepararCheckout');
Route::post('/webpay/create', [WebpayController::class, 'initTransaction'])->name('webpay.create');
Route::get('/webpay/return', [WebpayController::class, 'returnUrl'])->name('webpay.return');

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');


//VISTAS, Sin Controlador//

Route::get('/menu', [ProductoController::class, 'menu'])->name('menu');

Route::get('/aboutUs', function () {
    return Inertia::render('AboutUs');
})->name('aboutUs');

Route::get('/pago', function () {
    return Inertia::render('Pago');
})->name('pago');

Route::get('/administracion', function () {
    return Inertia::render('Administracion');
})->name('administracion');

// Rutas Administrativas
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Nueva ruta para ingreso de ventas del administrador
    Route::get('/ventaAdmin', [VentaController::class, 'create'])->name('venta.admin');
});

//Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');


Route::get('/inicio', [ProductoController::class, 'index'])->name('inicio');

Route::get('/', function () {
    return redirect()->route('inicio');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/mis_pedidos', [OrderHistoryController::class, 'index'])->name('order.history');
});

Route::get('/componentePrueba', [ProductoController::class, 'index'])->name('componentePrueba');

require __DIR__.'/auth.php';
