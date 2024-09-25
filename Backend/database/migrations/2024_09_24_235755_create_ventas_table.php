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
        Schema::create('ventas', function (Blueprint $table) {
            $table->integer('idVentas')->primary();
            $table->string('NumeroTransaccionVenta', 45);
            $table->string('totalVenta', 45);
            $table->string('metodoDePagoVenta', 45);
            $table->integer('Cientes_idCientes')->index('fk_ventas_cientes1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
