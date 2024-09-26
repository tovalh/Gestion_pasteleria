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
        Schema::create('ingrediente', function (Blueprint $table) {
            $table->integer('idIngrediente', true);
            $table->string('NombreIngrediente', 20);
            $table->integer('StockIngrediente');
            $table->integer('StockMinimoIngrediente');
            $table->string('UnidadDeMedidaIngrediente', 5);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingrediente');
    }
};
