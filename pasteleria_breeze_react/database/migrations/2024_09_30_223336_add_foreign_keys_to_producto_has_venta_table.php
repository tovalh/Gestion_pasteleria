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
        Schema::table('producto_has_venta', function (Blueprint $table) {
            $table->foreign(['Productos_idProducto'], 'fk_Productos_has_Ventas_Productos1')->references(['idProducto'])->on('producto')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['Venta_idVenta'], 'fk_Productos_has_Ventas_Ventas1')->references(['idVenta'])->on('venta')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('producto_has_venta', function (Blueprint $table) {
            $table->dropForeign('fk_Productos_has_Ventas_Productos1');
            $table->dropForeign('fk_Productos_has_Ventas_Ventas1');
        });
    }
};
