<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition(): array
    {
        return [
            'NombreCliente' => $this->faker->firstName(),
            'ApellidoCliente' => $this->faker->lastName(),
            'TelefonoCliente' => $this->faker->numerify('9########'),
            'DireccionCliente' => $this->faker->address(),
            'user_id' => User::factory(),
        ];
    }
}