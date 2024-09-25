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
        Schema::create('prodcutos_has_ingredientes', function (Blueprint $table) {
            $table->integer('Prodcutos_idProdcutos');
            $table->integer('Ingredientes_idIngredientes')->index('fk_prodcutos_has_ingredientes_ingredientes1');
            $table->integer('cantidad');

            $table->primary(['Prodcutos_idProdcutos', 'Ingredientes_idIngredientes']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prodcutos_has_ingredientes');
    }
};
