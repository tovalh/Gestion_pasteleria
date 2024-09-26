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
        Schema::create('venta', function (Blueprint $table) {
            $table->integer('idVenta', true);
            $table->integer('NumeroTransaccionVenta');
            $table->integer('totalVenta');
            $table->string('metodoDePagoVenta', 45);
            $table->integer('Clientes_idCliente')->index('fk_ventas_clientes1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venta');
    }
};
