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
        Schema::table('prodcutos_has_ingredientes', function (Blueprint $table) {
            $table->foreign(['Ingredientes_idIngredientes'], 'fk_Prodcutos_has_Ingredientes_Ingredientes1')->references(['idIngredientes'])->on('ingredientes')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['Prodcutos_idProdcutos'], 'fk_Prodcutos_has_Ingredientes_Prodcutos')->references(['idProdcutos'])->on('prodcutos')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prodcutos_has_ingredientes', function (Blueprint $table) {
            $table->dropForeign('fk_Prodcutos_has_Ingredientes_Ingredientes1');
            $table->dropForeign('fk_Prodcutos_has_Ingredientes_Prodcutos');
        });
    }
};
