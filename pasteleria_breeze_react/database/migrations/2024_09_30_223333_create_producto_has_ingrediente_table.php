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
        Schema::create('producto_has_ingrediente', function (Blueprint $table) {
            $table->integer('Producto_idProducto');
            $table->integer('Ingrediente_idIngrediente')->index('fk_productos_has_ingredientes_ingredientes1');
            $table->integer('cantidad');

            $table->primary(['Producto_idProducto', 'Ingrediente_idIngrediente']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_has_ingrediente');
    }
};
