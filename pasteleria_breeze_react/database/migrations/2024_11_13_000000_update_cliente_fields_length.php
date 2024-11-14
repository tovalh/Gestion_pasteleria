<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('cliente', function (Blueprint $table) {
            $table->string('NombreCliente', 100)->change();  // Aumentar a 100 caracteres
            $table->string('DireccionCliente', 200)->change(); // También aumentamos este por si acaso
        });
    }

    public function down()
    {
        Schema::table('cliente', function (Blueprint $table) {
            $table->string('NombreCliente', 20)->change();
            $table->string('DireccionCliente', 40)->change();
        });
    }
};
