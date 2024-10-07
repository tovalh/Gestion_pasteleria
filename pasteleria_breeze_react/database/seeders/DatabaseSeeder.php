<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Sección
        DB::table('seccion')->insert([
            ['idSeccion' => 1, 'NombreSeccion' => 'Pasteles', 'deleted_at' => null],
            ['idSeccion' => 2, 'NombreSeccion' => 'Panes', 'deleted_at' => null],
            ['idSeccion' => 3, 'NombreSeccion' => 'Galletas', 'deleted_at' => null],
        ]);

        // Productos
        DB::table('producto')->insert([
            [
                'idProducto' => 1,
                'NombreProducto' => 'Torta de Chocolate',
                'DescripcionProducto' => 'Deliciosa torta de chocolate con cobertura',
                'PrecioProducto' => 15000,
                'Seccion_idSeccion' => 1,
                'deleted_at' => null
            ],
            [
                'idProducto' => 2,
                'NombreProducto' => 'Pan Francés',
                'DescripcionProducto' => 'Pan crujiente tradicional',
                'PrecioProducto' => 1500,
                'Seccion_idSeccion' => 2,
                'deleted_at' => null
            ],
            [
                'idProducto' => 3,
                'NombreProducto' => 'Galletas de Mantequilla',
                'DescripcionProducto' => 'Galletas caseras de mantequilla',
                'PrecioProducto' => 2500,
                'Seccion_idSeccion' => 3,
                'deleted_at' => null
            ],
            [
                'idProducto' => 4,
                'NombreProducto' => 'Torta Tres Leches',
                'DescripcionProducto' => 'Torta húmeda de tres leches',
                'PrecioProducto' => 18000,
                'Seccion_idSeccion' => 1,
                'deleted_at' => null
            ]
        ]);

        // Ingredientes
        DB::table('ingrediente')->insert([
            [
                'idIngrediente' => 1,
                'NombreIngrediente' => 'Huevos',
                'StockIngrediente' => 100,
                'StockMinimoIngrediente' => 20,
                'UnidadDeMedidaIngrediente' => 'und',
                'deleted_at' => null
            ],
            [
                'idIngrediente' => 2,
                'NombreIngrediente' => 'Harina',
                'StockIngrediente' => 25000,
                'StockMinimoIngrediente' => 5000,
                'UnidadDeMedidaIngrediente' => 'gr',
                'deleted_at' => null
            ],
            [
                'idIngrediente' => 3,
                'NombreIngrediente' => 'Leche',
                'StockIngrediente' => 10000,
                'StockMinimoIngrediente' => 2000,
                'UnidadDeMedidaIngrediente' => 'ml',
                'deleted_at' => null
            ],
            [
                'idIngrediente' => 4,
                'NombreIngrediente' => 'Chocolate',
                'StockIngrediente' => 5000,
                'StockMinimoIngrediente' => 1000,
                'UnidadDeMedidaIngrediente' => 'gr',
                'deleted_at' => null
            ],
            [
                'idIngrediente' => 5,
                'NombreIngrediente' => 'Mantequilla',
                'StockIngrediente' => 5000,
                'StockMinimoIngrediente' => 1000,
                'UnidadDeMedidaIngrediente' => 'gr',
                'deleted_at' => null
            ]
        ]);

        // Producto_has_ingrediente
        DB::table('producto_has_ingrediente')->insert([
            // Torta de Chocolate
            [
                'Producto_idProducto' => 1,
                'Ingrediente_idIngrediente' => 1,
                'cantidad' => 3  // 3 huevos
            ],
            [
                'Producto_idProducto' => 1,
                'Ingrediente_idIngrediente' => 2,
                'cantidad' => 500  // 500g harina
            ],
            [
                'Producto_idProducto' => 1,
                'Ingrediente_idIngrediente' => 4,
                'cantidad' => 200  // 200g chocolate
            ],
            // Pan Francés
            [
                'Producto_idProducto' => 2,
                'Ingrediente_idIngrediente' => 2,
                'cantidad' => 1000  // 1kg harina
            ],
            // Galletas de Mantequilla
            [
                'Producto_idProducto' => 3,
                'Ingrediente_idIngrediente' => 2,
                'cantidad' => 250  // 250g harina
            ],
            [
                'Producto_idProducto' => 3,
                'Ingrediente_idIngrediente' => 5,
                'cantidad' => 125  // 125g mantequilla
            ]
        ]);

        // Clientes
        DB::table('cliente')->insert([
            [
                'idCliente' => 1,
                'NombreCliente' => 'Juan Pérez',
                'CorreoCliente' => 'juan@example.com',
                'RutCliente' => '12345678-9',
                'NumeroCliente' => '912345678',
                'DireccionCliente' => 'Av. Principal 123'
            ],
            [
                'idCliente' => 2,
                'NombreCliente' => 'María González',
                'CorreoCliente' => 'maria@example.com',
                'RutCliente' => '98765432-1',
                'NumeroCliente' => '987654321',
                'DireccionCliente' => 'Calle Secundaria 456'
            ]
        ]);

        // Ventas
        DB::table('venta')->insert([
            [
                'idVenta' => 1,
                'NumeroTransaccionVenta' => 1001,
                'totalVenta' => 15000,
                'metodoDePagoVenta' => 'efectivo',
                'Clientes_idCliente' => 1
            ],
            [
                'idVenta' => 2,
                'NumeroTransaccionVenta' => 1002,
                'totalVenta' => 20000,
                'metodoDePagoVenta' => 'tarjeta',
                'Clientes_idCliente' => 2
            ]
        ]);

        // Producto_has_venta
        DB::table('producto_has_venta')->insert([
            [
                'Productos_idProducto' => 1,
                'Venta_idVenta' => 1
            ],
            [
                'Productos_idProducto' => 2,
                'Venta_idVenta' => 2
            ],
            [
                'Productos_idProducto' => 3,
                'Venta_idVenta' => 2
            ]
        ]);

    }
}
