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
        Schema::create('ingredientes', function (Blueprint $table) {
            $table->integer('idIngredientes')->primary();
            $table->string('NombreIngrediente', 20);
            $table->integer('StockIngrediente');
            $table->integer('AlertaStockIngrediente');
            $table->string('UnidadDeMedidaIngrediente', 10);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredientes');
    }
};
