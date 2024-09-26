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
        Schema::table('producto', function (Blueprint $table) {
            $table->foreign(['Seccion_idSeccion'], 'fk_Prodcutos_Seccion1')->references(['idSeccion'])->on('seccion')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('producto', function (Blueprint $table) {
            $table->dropForeign('fk_Prodcutos_Seccion1');
        });
    }
};
