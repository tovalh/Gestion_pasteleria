<?php

namespace Database\Factories;

use App\Models\Venta;
use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class VentaFactory extends Factory
{
    protected $model = Venta::class;

    public function definition(): array
    {
        $estados = [
            Venta::ESTADO_EN_PROCESO,
            Venta::ESTADO_DISPONIBLE,
            Venta::ESTADO_ENTREGADO,
            Venta::ESTADO_CANCELADO
        ];

        $metodos = [
            Venta::METODO_WEBPAY,
            Venta::METODO_EFECTIVO
        ];

        return [
            'NumeroTransaccionVenta' => $this->faker->unique()->numerify('TXN########'),
            'totalVenta' => $this->faker->numberBetween(5000, 50000),
            'metodoDePagoVenta' => $this->faker->randomElement($metodos),
            'estadoPedido' => $this->faker->randomElement($estados),
            'fechaEntrega' => $this->faker->dateTimeBetween('now', '+7 days'),
            'Comentario' => $this->faker->optional(0.7)->sentence(),
            'Clientes_idCliente' => Cliente::factory(),
            'created_at' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'updated_at' => fn (array $attributes) => $attributes['created_at'],
        ];
    }
}