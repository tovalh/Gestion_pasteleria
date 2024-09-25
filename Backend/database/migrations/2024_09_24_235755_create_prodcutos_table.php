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
        Schema::create('prodcutos', function (Blueprint $table) {
            $table->integer('idProdcutos');
            $table->string('NombreProducto', 15);
            $table->mediumText('DescripcionProducto');
            $table->string('PrecioProducto', 12);
            $table->integer('Seccion_idSecciones')->index('fk_prodcutos_seccion1');

            $table->primary(['idProdcutos', 'Seccion_idSecciones']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prodcutos');
    }
};
