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
        Schema::create('cientes', function (Blueprint $table) {
            $table->integer('idCientes')->primary();
            $table->string('NombreCliente', 20);
            $table->string('CorreoCliente', 25);
            $table->string('RutCleinte', 15);
            $table->string('NumeroCiente', 12);
            $table->string('DireccionCiente', 40);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cientes');
    }
};
