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
        Schema::table('prodcutos_has_ventas', function (Blueprint $table) {
            $table->foreign(['Prodcutos_idProdcutos'], 'fk_Prodcutos_has_Ventas_Prodcutos1')->references(['idProdcutos'])->on('prodcutos')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['Ventas_idVentas'], 'fk_Prodcutos_has_Ventas_Ventas1')->references(['idVentas'])->on('ventas')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prodcutos_has_ventas', function (Blueprint $table) {
            $table->dropForeign('fk_Prodcutos_has_Ventas_Prodcutos1');
            $table->dropForeign('fk_Prodcutos_has_Ventas_Ventas1');
        });
    }
};
