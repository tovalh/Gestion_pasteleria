<?php

namespace Database\Factories;

use App\Models\Seccion;
use Illuminate\Database\Eloquent\Factories\Factory;

class SeccionFactory extends Factory
{
    protected $model = Seccion::class;

    public function definition(): array
    {
        $secciones = [
            'Tortas',
            'Pasteles',
            'Cupcakes',
            'Galletas',
            'Panes',
            'Postres Fríos',
            'Tartas',
            'Muffins',
            'Brownies',
            'Macarons'
        ];

        return [
            'NombreSeccion' => $this->faker->unique()->randomElement($secciones),
        ];
    }
}