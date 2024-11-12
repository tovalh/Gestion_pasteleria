<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('administrador', function (Blueprint $table) {
            // Añade el campo email después de NombreUsuario
            $table->string('email')->after('NombreUsuario');
        });
    }

    public function down()
    {
        Schema::table('administrador', function (Blueprint $table) {
            // Si necesitas revertir la migración, elimina el campo
            $table->dropColumn('email');
        });
    }
};
