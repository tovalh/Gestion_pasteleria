<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('producto_has_venta', function (Blueprint $table) {
            $table->integer('Productos_idProducto');
            $table->integer('Venta_idVenta')->index('fk_prodcutos_has_ventas_ventas1');

            $table->primary(['Productos_idProducto', 'Venta_idVenta']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_has_venta');
    }
};
