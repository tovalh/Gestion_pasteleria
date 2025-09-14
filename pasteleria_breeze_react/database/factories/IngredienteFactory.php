<?php

namespace Database\Factories;

use App\Models\Ingrediente;
use Illuminate\Database\Eloquent\Factories\Factory;

class IngredienteFactory extends Factory
{
    protected $model = Ingrediente::class;

    public function definition(): array
    {
        $ingredientes = [
            // Ingredientes básicos
            ['nombre' => 'Harina', 'unidad' => 'kg', 'stock' => [50, 100]],
            ['nombre' => 'Azúcar blanca', 'unidad' => 'kg', 'stock' => [30, 80]],
            ['nombre' => 'Azúcar morena', 'unidad' => 'kg', 'stock' => [20, 60]],
            ['nombre' => 'Mantequilla', 'unidad' => 'kg', 'stock' => [25, 50]],
            ['nombre' => 'Huevos', 'unidad' => 'unidades', 'stock' => [100, 300]],
            ['nombre' => 'Leche', 'unidad' => 'litros', 'stock' => [20, 40]],
            ['nombre' => 'Crema de leche', 'unidad' => 'litros', 'stock' => [15, 30]],
            
            // Chocolates
            ['nombre' => 'Chocolate negro', 'unidad' => 'kg', 'stock' => [10, 25]],
            ['nombre' => 'Chocolate con leche', 'unidad' => 'kg', 'stock' => [8, 20]],
            ['nombre' => 'Chocolate blanco', 'unidad' => 'kg', 'stock' => [5, 15]],
            ['nombre' => 'Cacao en polvo', 'unidad' => 'kg', 'stock' => [10, 20]],
            
            // Frutas
            ['nombre' => 'Fresas', 'unidad' => 'kg', 'stock' => [5, 15]],
            ['nombre' => 'Frambuesas', 'unidad' => 'kg', 'stock' => [3, 10]],
            ['nombre' => 'Manzanas', 'unidad' => 'kg', 'stock' => [10, 25]],
            ['nombre' => 'Plátanos', 'unidad' => 'kg', 'stock' => [8, 20]],
            ['nombre' => 'Limones', 'unidad' => 'unidades', 'stock' => [20, 50]],
            
            // Especias y saborizantes
            ['nombre' => 'Vainilla', 'unidad' => 'ml', 'stock' => [500, 1000]],
            ['nombre' => 'Canela', 'unidad' => 'g', 'stock' => [200, 500]],
            ['nombre' => 'Nuez moscada', 'unidad' => 'g', 'stock' => [100, 300]],
            ['nombre' => 'Esencia de almendra', 'unidad' => 'ml', 'stock' => [200, 400]],
            
            // Frutos secos
            ['nombre' => 'Almendras', 'unidad' => 'kg', 'stock' => [5, 15]],
            ['nombre' => 'Nueces', 'unidad' => 'kg', 'stock' => [3, 10]],
            ['nombre' => 'Avellanas', 'unidad' => 'kg', 'stock' => [2, 8]],
            
            // Otros
            ['nombre' => 'Polvo de hornear', 'unidad' => 'g', 'stock' => [1000, 2000]],
            ['nombre' => 'Bicarbonato', 'unidad' => 'g', 'stock' => [500, 1500]],
            ['nombre' => 'Sal', 'unidad' => 'kg', 'stock' => [2, 5]],
            ['nombre' => 'Gelatina sin sabor', 'unidad' => 'g', 'stock' => [200, 500]],
        ];

        $ingrediente = $this->faker->unique()->randomElement($ingredientes);
        
        return [
            'NombreIngrediente' => $ingrediente['nombre'],
            'UnidadMedida' => $ingrediente['unidad'],
            'CantidadEnStock' => $this->faker->numberBetween($ingrediente['stock'][0], $ingrediente['stock'][1]),
            'CantidadMinima' => $this->faker->numberBetween(5, 20),
        ];
    }
}