<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
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

// Ruta principal redirige a inicio
Route::get('/', function () {
    return redirect()->route('inicio');
});

// Rutas públicas
Route::get('/inicio', [ProductoController::class, 'index'])->name('inicio');
Route::get('/menu', [ProductoController::class, 'menu'])->name('menu');
Route::get('/producto/{id}', [ProductoController::class, 'mostrarProducto'])->name('producto.detalle');
Route::get('/aboutUs', function () {
    return Inertia::render('AboutUs');
})->name('aboutUs');

Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');

// Rutas de seguimiento
Route::get('/seguimiento', function () {
    return Inertia::render('Seguimiento');
})->name('seguimiento');

// Rutas de WebPay
Route::post('/venta/preparar-checkout', [VentaController::class, 'prepararCheckout'])->name('venta.prepararCheckout');
Route::post('/webpay/create', [WebpayController::class, 'initTransaction'])->name('webpay.create');
Route::get('/webpay/return', [WebpayController::class, 'returnUrl'])->name('webpay.return');

// Rutas protegidas por autenticación normal
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/mis_pedidos', [OrderHistoryController::class, 'index'])->name('order.history');
    Route::get('/pago', function () {
        return Inertia::render('Pago');
    })->name('pago');
});

// Rutas Administrativas (protegidas por auth y admin middleware)
Route::middleware(['auth', 'admin'])->group(function () {
    // Dashboard y administración general
    Route::get('/administracion', [AdminController::class, 'index'])->name('administracion');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Gestión de ventas administrativas
    Route::get('/ventaAdmin', [VentaController::class, 'create'])->name('venta.admin');
    Route::post('/ventas/store-admin', [VentaController::class, 'storeVentaAdmin'])->name('ventas.storeAdmin');
    Route::get('/ventas/VentaAdmin/{id}', [VentaController::class, 'showAdmin'])->name('ventas.showAdmin');
    Route::get('/ventas-por-periodo', [VentaController::class, 'obtenerVentasPorPeriodo'])->name('ventas.periodo');
    Route::put('/ventas/{id}', [VentaController::class, 'update'])->name('ventas.update');

    // Gestión de recursos
    Route::resource('seccion', SeccionController::class);
    Route::resource('secciones', SeccionController::class);
    Route::resource('ingredientes', IngredienteController::class);
    Route::resource('ventas', VentaController::class);

    // Rutas adicionales de sección
    Route::get('/seccion/token', [SeccionController::class, 'token'])->name('seccion.token');
});

// Rutas de prueba
Route::get('/ventas/test-page', function () {
    return Inertia::render('Ventas/Test');
});
Route::post('/ventas/test', [VentaController::class, 'store']);

Route::get('/componentePrueba', [ProductoController::class, 'index'])->name('componentePrueba');

// Incluir rutas de autenticación
require __DIR__.'/auth.php';
