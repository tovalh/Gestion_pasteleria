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
        Schema::table('prodcutos', function (Blueprint $table) {
            $table->foreign(['Seccion_idSecciones'], 'fk_Prodcutos_Seccion1')->references(['idSecciones'])->on('seccion')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prodcutos', function (Blueprint $table) {
            $table->dropForeign('fk_Prodcutos_Seccion1');
        });
    }
};
