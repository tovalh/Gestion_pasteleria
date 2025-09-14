<?php

namespace Database\Factories;

use App\Models\Administrador;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdministradorFactory extends Factory
{
    protected $model = Administrador::class;

    public function definition(): array
    {
        return [
            'NombreAdministrador' => $this->faker->firstName(),
            'ApellidoAdministrador' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}