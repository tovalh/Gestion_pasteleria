<?php

use App\Http\Controllers\RecetaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\IngredienteController;
use App\Http\Controllers\OrderHistoryController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeccionController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\WebpayController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta principal redirige a inicio
Route::get('/', function () {
    return redirect()->route('inicio');
});

// === Rutas Públicas ===
Route::get('/inicio', [ProductoController::class, 'index'])->name('inicio');
Route::get('/menu', [ProductoController::class, 'menu'])->name('menu');
Route::get('/producto/{id}', [ProductoController::class, 'mostrarProducto'])->name('producto.detalle');
Route::get('/aboutUs', function () {
    return Inertia::render('AboutUs');
})->name('aboutUs');

// === Rutas de Seguimiento ===
Route::get('/seguimiento', function () {
    return Inertia::render('Seguimiento');
})->name('seguimiento');
Route::get('/seguimiento-pedido/{numeroTransaccion}', [VentaController::class, 'show'])->name('seguimiento.show');

// === Rutas de Pago y WebPay ===
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');
Route::get('/pago', function () {
    return Inertia::render('Pago');
})->name('pago');
Route::post('/venta/preparar-checkout', [VentaController::class, 'prepararCheckout'])->name('venta.prepararCheckout');
Route::post('/webpay/create', [WebpayController::class, 'initTransaction'])->name('webpay.create');
Route::get('/webpay/return', [WebpayController::class, 'returnUrl'])->name('webpay.return');

// === Rutas Autenticadas ===
Route::middleware('auth')->group(function () {
    // Perfil de Usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Historial de Pedidos
    Route::get('/mis_pedidos', [OrderHistoryController::class, 'index'])->name('order.history');
    // Nueva ruta para ver detalles de un pedido específico
    Route::get('/pedido/{id}', [OrderHistoryController::class, 'show'])->name('pedido.show');
});

// === Rutas Administrativas ===
Route::middleware(['auth', 'admin'])->group(function () {
    // Dashboard y Panel Admin
    Route::get('/administracion', [AdminController::class, 'index'])->name('administracion');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Gestión de Ventas
    Route::prefix('ventas')->group(function () {
        Route::get('/admin', [VentaController::class, 'create'])->name('venta.admin');
        Route::post('/store-admin', [VentaController::class, 'storeVentaAdmin'])->name('ventas.storeAdmin');
        Route::get('/admin/{id}', [VentaController::class, 'showAdmin'])->name('ventas.showAdmin');
        Route::get('/por-periodo', [VentaController::class, 'obtenerVentasPorPeriodo'])->name('ventas.periodo');
        Route::put('/{id}', [VentaController::class, 'update'])->name('ventas.update');
    });

    // Gestión de Recursos
    Route::resources([
        'seccion' => SeccionController::class,
        'secciones' => SeccionController::class,
        'ingredientes' => IngredienteController::class,
        'producto' => ProductoController::class,
        'productos' => ProductoController::class,
        'ventas' => VentaController::class,
    ]);

    // Gestión de Recetas
    Route::prefix('productos')->group(function () {
        Route::get('/{producto}/receta', [RecetaController::class, 'edit'])->name('productos.receta');
        Route::get('/{producto}/ingredientes', [RecetaController::class, 'getIngredientes'])->name('api.recetas.ingredientes');
        Route::post('/{producto}/actualizar-receta', [RecetaController::class, 'actualizarReceta'])->name('api.recetas.actualizar');
    });
});

// === Rutas de API ===
Route::prefix('api')->group(function () {
    Route::get('/recetas/{producto}/ingredientes', [RecetaController::class, 'getIngredientes']);
    Route::post('/recetas/{producto}/actualizar', [RecetaController::class, 'actualizarReceta']);
});

// === Rutas de Prueba ===
Route::get('/ventas/test-page', function () {
    return Inertia::render('Ventas/Test');
});
Route::post('/ventas/test', [VentaController::class, 'store']);
Route::get('/componentePrueba', [ProductoController::class, 'index'])->name('componentePrueba');

// Incluir rutas de autenticación
require __DIR__.'/auth.php';
