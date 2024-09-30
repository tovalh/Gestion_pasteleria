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
        Schema::create('cliente', function (Blueprint $table) {
            $table->integer('idCliente', true);
            $table->string('NombreCliente', 20);
            $table->string('CorreoCliente', 40);
            $table->string('RutCliente', 40);
            $table->string('NumeroCliente', 12);
            $table->string('DireccionCliente', 40);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cliente');
    }
};
