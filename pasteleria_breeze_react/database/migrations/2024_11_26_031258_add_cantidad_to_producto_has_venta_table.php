<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('producto_has_venta', function (Blueprint $table) {
            $table->integer('cantidad')->default(1)->after('Productos_idProducto');
        });
    }

    public function down()
    {
        Schema::table('producto_has_venta', function (Blueprint $table) {
            $table->dropColumn('cantidad');
        });
    }
};
