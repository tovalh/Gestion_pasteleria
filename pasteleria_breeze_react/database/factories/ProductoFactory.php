<?php

namespace Database\Factories;

use App\Models\Producto;
use App\Models\Seccion;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoFactory extends Factory
{
    protected $model = Producto::class;

    public function definition(): array
    {
        $productos = [
            // Tortas
            ['nombre' => 'Torta Tres Leches', 'precio' => [15000, 25000], 'descripcion' => 'Deliciosa torta esponjosa empapada en tres tipos de leche'],
            ['nombre' => 'Torta de Chocolate', 'precio' => [18000, 28000], 'descripcion' => 'Torta húmeda de chocolate con ganache y decoración'],
            ['nombre' => 'Torta Red Velvet', 'precio' => [20000, 30000], 'descripcion' => 'Clásica torta red velvet con frosting de queso crema'],
            ['nombre' => 'Torta de Zanahoria', 'precio' => [16000, 24000], 'descripcion' => 'Torta especiada con zanahoria, nueces y frosting cremoso'],
            ['nombre' => 'Torta Lemon Pie', 'precio' => [17000, 26000], 'descripcion' => 'Torta de limón con merengue dorado al fuego'],
            
            // Pasteles individuales
            ['nombre' => 'Pastel de Frambuesa', 'precio' => [3500, 5000], 'descripcion' => 'Pastel individual con mousse de frambuesa'],
            ['nombre' => 'Pastel de Maracuyá', 'precio' => [3800, 5200], 'descripcion' => 'Pastel con crema de maracuyá y bizcocho esponjoso'],
            ['nombre' => 'Éclair de Chocolate', 'precio' => [2500, 3500], 'descripcion' => 'Clásico éclair relleno de crema pastelera y chocolate'],
            ['nombre' => 'Profiterol', 'precio' => [2000, 3000], 'descripcion' => 'Masa choux rellena de crema chantilly'],
            
            // Cupcakes
            ['nombre' => 'Cupcake de Vainilla', 'precio' => [1800, 2500], 'descripcion' => 'Cupcake clásico de vainilla con buttercream'],
            ['nombre' => 'Cupcake de Chocolate', 'precio' => [1900, 2600], 'descripcion' => 'Cupcake de chocolate con frosting de chocolate'],
            ['nombre' => 'Cupcake Red Velvet', 'precio' => [2200, 3000], 'descripcion' => 'Cupcake red velvet con cream cheese frosting'],
            
            // Galletas
            ['nombre' => 'Galletas Chispas Chocolate', 'precio' => [800, 1200], 'descripcion' => 'Pack de 6 galletas con chispas de chocolate'],
            ['nombre' => 'Galletas de Avena', 'precio' => [750, 1100], 'descripcion' => 'Pack de 6 galletas saludables de avena y pasas'],
            ['nombre' => 'Macarons Surtidos', 'precio' => [1500, 2000], 'descripcion' => 'Pack de 4 macarons de diferentes sabores'],
            
            // Panes
            ['nombre' => 'Pan de Centeno', 'precio' => [2500, 3500], 'descripcion' => 'Pan artesanal de centeno con semillas'],
            ['nombre' => 'Pan Brioche', 'precio' => [3000, 4000], 'descripcion' => 'Pan francés suave y mantecoso'],
            ['nombre' => 'Pan Integral', 'precio' => [2200, 3200], 'descripcion' => 'Pan integral con granos y semillas'],
            
            // Postres fríos
            ['nombre' => 'Tiramisu', 'precio' => [4500, 6000], 'descripcion' => 'Clásico postre italiano con café y mascarpone'],
            ['nombre' => 'Cheesecake de Frutos Rojos', 'precio' => [5000, 7000], 'descripcion' => 'Cheesecake cremoso con coulis de frutos rojos'],
            ['nombre' => 'Panna Cotta', 'precio' => [3500, 4500], 'descripcion' => 'Postre italiano cremoso con salsa de frutas'],
            
            // Tartas
            ['nombre' => 'Tarta de Manzana', 'precio' => [12000, 18000], 'descripcion' => 'Tarta tradicional de manzana con canela'],
            ['nombre' => 'Tarta de Frutillas', 'precio' => [14000, 20000], 'descripcion' => 'Tarta con crema pastelera y frutillas frescas'],
            
            // Muffins
            ['nombre' => 'Muffin de Arándanos', 'precio' => [1500, 2200], 'descripcion' => 'Muffin esponjoso con arándanos frescos'],
            ['nombre' => 'Muffin de Chocolate', 'precio' => [1600, 2300], 'descripcion' => 'Muffin con chispas de chocolate'],
            
            // Brownies
            ['nombre' => 'Brownie Clásico', 'precio' => [2500, 3500], 'descripcion' => 'Brownie húmedo con nueces'],
            ['nombre' => 'Brownie con Dulce de Leche', 'precio' => [2800, 3800], 'descripcion' => 'Brownie con swirl de dulce de leche'],
        ];

        $producto = $this->faker->randomElement($productos);
        
        return [
            'NombreProducto' => $producto['nombre'],
            'RutaImagen' => '/images/productos/' . strtolower(str_replace(' ', '_', $producto['nombre'])) . '.jpg',
            'DescripcionProducto' => $producto['descripcion'],
            'PrecioProducto' => $this->faker->numberBetween($producto['precio'][0], $producto['precio'][1]),
            'Seccion_idSeccion' => Seccion::factory(),
        ];
    }
}