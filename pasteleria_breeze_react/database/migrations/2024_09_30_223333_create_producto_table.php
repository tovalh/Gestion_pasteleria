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
        Schema::create('producto', function (Blueprint $table) {
            $table->integer('idProducto', true);
            $table->string('NombreProducto', 35);
            $table->mediumText('DescripcionProducto');
            $table->integer('PrecioProducto');
            $table->softDeletes();
            $table->integer('Seccion_idSeccion')->index('fk_productos_seccion1');

            $table->primary(['idProducto', 'Seccion_idSeccion']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto');
    }
};
