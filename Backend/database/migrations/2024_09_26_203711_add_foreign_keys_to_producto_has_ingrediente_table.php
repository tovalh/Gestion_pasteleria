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
        Schema::table('producto_has_ingrediente', function (Blueprint $table) {
            $table->foreign(['Ingrediente_idIngrediente'], 'fk_Prodcutos_has_Ingredientes_Ingredientes1')->references(['idIngrediente'])->on('ingrediente')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['Prodcuto_idProducto'], 'fk_Prodcutos_has_Ingredientes_Prodcutos')->references(['idProducto'])->on('producto')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('producto_has_ingrediente', function (Blueprint $table) {
            $table->dropForeign('fk_Prodcutos_has_Ingredientes_Ingredientes1');
            $table->dropForeign('fk_Prodcutos_has_Ingredientes_Prodcutos');
        });
    }
};
