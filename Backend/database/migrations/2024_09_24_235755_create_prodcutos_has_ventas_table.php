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
        Schema::create('prodcutos_has_ventas', function (Blueprint $table) {
            $table->integer('Prodcutos_idProdcutos');
            $table->integer('Ventas_idVentas')->index('fk_prodcutos_has_ventas_ventas1');

            $table->primary(['Prodcutos_idProdcutos', 'Ventas_idVentas']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prodcutos_has_ventas');
    }
};
