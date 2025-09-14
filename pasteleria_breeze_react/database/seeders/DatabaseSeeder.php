<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Administrador;
use App\Models\Seccion;
use App\Models\Ingrediente;
use App\Models\Producto;
use App\Models\Cliente;
use App\Models\Venta;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // =====================================================
        // USUARIOS Y ADMINISTRADORES
        // =====================================================

        // Usuario administrador principal
        $adminUser = User::create([
            'name' => 'Administrador Principal',
            'email' => 'admin@dolcimimi.com',
            'password' => Hash::make('admin123'),
        ]);

        // Registro del administrador
        Administrador::create([
            'NombreUsuario' => 'admin',
            'ClaveUsuario' => 'admin123',
            'email' => 'admin@dolcimimi.com'
        ]);

        // Usuarios adicionales para testing
        $testUsers = [
            ['name' => 'Juan Carlos', 'email' => 'juan@test.com'],
            ['name' => 'María Elena', 'email' => 'maria@test.com'],
            ['name' => 'Pedro Silva', 'email' => 'pedro@test.com'],
            ['name' => 'Ana García', 'email' => 'ana@test.com'],
            ['name' => 'Luis Morales', 'email' => 'luis@test.com'],
        ];

        foreach ($testUsers as $userData) {
            User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('password'),
            ]);
        }

        // =====================================================
        // SECCIONES DE PRODUCTOS
        // =====================================================

        $secciones = [
            'Tortas y Pasteles',
            'Cupcakes y Muffins',
            'Galletas y Cookies',
            'Panes Artesanales',
            'Postres Fríos',
            'Tartas',
            'Brownies',
            'Macarons',
            'Empanadas Dulces',
            'Especialidades'
        ];

        foreach ($secciones as $index => $seccionNombre) {
            Seccion::create([
                'idSeccion' => $index + 1,
                'NombreSeccion' => $seccionNombre
            ]);
        }

        // =====================================================
        // INGREDIENTES COMPLETOS
        // =====================================================

        $ingredientesData = [
            // Ingredientes básicos de panadería
            ['nombre' => 'Harina 0000', 'unidad' => 'kg', 'stock' => 75, 'minimo' => 15],
            ['nombre' => 'Harina integral', 'unidad' => 'kg', 'stock' => 50, 'minimo' => 10],
            ['nombre' => 'Azúcar blanca', 'unidad' => 'kg', 'stock' => 60, 'minimo' => 12],
            ['nombre' => 'Azúcar morena', 'unidad' => 'kg', 'stock' => 40, 'minimo' => 8],
            ['nombre' => 'Mantequilla sin sal', 'unidad' => 'kg', 'stock' => 35, 'minimo' => 7],
            ['nombre' => 'Margarina', 'unidad' => 'kg', 'stock' => 25, 'minimo' => 5],
            ['nombre' => 'Huevos frescos', 'unidad' => 'unid', 'stock' => 200, 'minimo' => 50],

            // Lácteos
            ['nombre' => 'Leche entera', 'unidad' => 'lts', 'stock' => 30, 'minimo' => 8],
            ['nombre' => 'Crema de leche 35%', 'unidad' => 'lts', 'stock' => 20, 'minimo' => 5],
            ['nombre' => 'Yogur natural', 'unidad' => 'kg', 'stock' => 15, 'minimo' => 3],
            ['nombre' => 'Queso crema', 'unidad' => 'kg', 'stock' => 18, 'minimo' => 4],
            ['nombre' => 'Dulce de leche', 'unidad' => 'kg', 'stock' => 25, 'minimo' => 5],

            // Chocolates y cacaos
            ['nombre' => 'Chocolate negro 70%', 'unidad' => 'kg', 'stock' => 15, 'minimo' => 3],
            ['nombre' => 'Chocolate con leche', 'unidad' => 'kg', 'stock' => 12, 'minimo' => 3],
            ['nombre' => 'Chocolate blanco', 'unidad' => 'kg', 'stock' => 8, 'minimo' => 2],
            ['nombre' => 'Cacao en polvo', 'unidad' => 'kg', 'stock' => 10, 'minimo' => 2],
            ['nombre' => 'Chispas de chocolate', 'unidad' => 'kg', 'stock' => 6, 'minimo' => 1],

            // Frutas frescas
            ['nombre' => 'Fresas', 'unidad' => 'kg', 'stock' => 8, 'minimo' => 2],
            ['nombre' => 'Frambuesas', 'unidad' => 'kg', 'stock' => 5, 'minimo' => 1],
            ['nombre' => 'Arándanos', 'unidad' => 'kg', 'stock' => 6, 'minimo' => 1],
            ['nombre' => 'Manzanas verdes', 'unidad' => 'kg', 'stock' => 12, 'minimo' => 3],
            ['nombre' => 'Plátanos', 'unidad' => 'kg', 'stock' => 10, 'minimo' => 2],
            ['nombre' => 'Limones', 'unidad' => 'kg', 'stock' => 8, 'minimo' => 2],
            ['nombre' => 'Naranjas', 'unidad' => 'kg', 'stock' => 10, 'minimo' => 2],

            // Frutos secos
            ['nombre' => 'Almendras', 'unidad' => 'kg', 'stock' => 8, 'minimo' => 2],
            ['nombre' => 'Nueces', 'unidad' => 'kg', 'stock' => 6, 'minimo' => 1],
            ['nombre' => 'Avellanas', 'unidad' => 'kg', 'stock' => 4, 'minimo' => 1],
            ['nombre' => 'Pistachos', 'unidad' => 'kg', 'stock' => 3, 'minimo' => 1],

            // Especias y saborizantes
            ['nombre' => 'Vainilla', 'unidad' => 'ml', 'stock' => 500, 'minimo' => 100],
            ['nombre' => 'Canela molida', 'unidad' => 'g', 'stock' => 300, 'minimo' => 50],
            ['nombre' => 'Nuez moscada', 'unidad' => 'g', 'stock' => 150, 'minimo' => 30],
            ['nombre' => 'Almendra líquida', 'unidad' => 'ml', 'stock' => 250, 'minimo' => 50],
            ['nombre' => 'Ron', 'unidad' => 'ml', 'stock' => 200, 'minimo' => 40],

            // Levaduras y polvos
            ['nombre' => 'Polvo de hornear', 'unidad' => 'g', 'stock' => 1500, 'minimo' => 300],
            ['nombre' => 'Bicarbonato de sodio', 'unidad' => 'g', 'stock' => 1000, 'minimo' => 200],
            ['nombre' => 'Levadura fresca', 'unidad' => 'g', 'stock' => 800, 'minimo' => 150],
            ['nombre' => 'Levadura seca', 'unidad' => 'g', 'stock' => 500, 'minimo' => 100],

            // Otros ingredientes
            ['nombre' => 'Sal fina', 'unidad' => 'kg', 'stock' => 5, 'minimo' => 1],
            ['nombre' => 'Gelatina sin sabor', 'unidad' => 'g', 'stock' => 400, 'minimo' => 80],
            ['nombre' => 'Mermelada frutilla', 'unidad' => 'kg', 'stock' => 10, 'minimo' => 2],
            ['nombre' => 'Miel', 'unidad' => 'kg', 'stock' => 8, 'minimo' => 2],
            ['nombre' => 'Azúcar impalpable', 'unidad' => 'kg', 'stock' => 15, 'minimo' => 3],
        ];

        foreach ($ingredientesData as $index => $ing) {
            Ingrediente::create([
                'idIngrediente' => $index + 1,
                'NombreIngrediente' => $ing['nombre'],
                'UnidadDeMedidaIngrediente' => $ing['unidad'],
                'StockIngrediente' => $ing['stock'],
                'StockMinimoIngrediente' => $ing['minimo']
            ]);
        }

        // =====================================================
        // PRODUCTOS CON PRECIOS CHILENOS REALISTAS
        // =====================================================

        $productosData = [
            // Tortas y Pasteles (Sección 1)
            ['nombre' => 'Torta Tres Leches', 'precio' => 22000, 'descripcion' => 'Deliciosa torta esponjosa empapada en tres tipos de leche con canela', 'seccion' => 1],
            ['nombre' => 'Torta de Chocolate Premium', 'precio' => 25000, 'descripcion' => 'Torta húmeda de chocolate con ganache belga y decoración artesanal', 'seccion' => 1],
            ['nombre' => 'Torta Red Velvet', 'precio' => 28000, 'descripcion' => 'Clásica torta red velvet con frosting de queso crema y decoración', 'seccion' => 1],
            ['nombre' => 'Torta de Zanahoria', 'precio' => 24000, 'descripcion' => 'Torta especiada con zanahoria, nueces y frosting cremoso de queso', 'seccion' => 1],
            ['nombre' => 'Torta Lemon Pie', 'precio' => 26000, 'descripcion' => 'Torta de limón con merengue dorado al fuego y base crocante', 'seccion' => 1],
            ['nombre' => 'Torta de Frutas del Bosque', 'precio' => 30000, 'descripcion' => 'Torta con crema chantilly y frutas frescas del bosque', 'seccion' => 1],

            // Cupcakes y Muffins (Sección 2)
            ['nombre' => 'Cupcake de Vainilla', 'precio' => 2200, 'descripcion' => 'Cupcake clásico de vainilla con buttercream y decoración', 'seccion' => 2],
            ['nombre' => 'Cupcake de Chocolate', 'precio' => 2400, 'descripcion' => 'Cupcake de chocolate húmedo con frosting de chocolate negro', 'seccion' => 2],
            ['nombre' => 'Cupcake Red Velvet', 'precio' => 2800, 'descripcion' => 'Cupcake red velvet con cream cheese frosting', 'seccion' => 2],
            ['nombre' => 'Muffin de Arándanos', 'precio' => 2000, 'descripcion' => 'Muffin esponjoso con arándanos frescos y streusel', 'seccion' => 2],
            ['nombre' => 'Muffin de Chocolate', 'precio' => 2100, 'descripcion' => 'Muffin con chispas de chocolate y cobertura crocante', 'seccion' => 2],
            ['nombre' => 'Muffin de Limón', 'precio' => 1900, 'descripcion' => 'Muffin cítrico con glaseado de limón natural', 'seccion' => 2],

            // Galletas y Cookies (Sección 3)
            ['nombre' => 'Galletas Chispas Chocolate', 'precio' => 1200, 'descripcion' => 'Pack de 6 galletas artesanales con chispas de chocolate', 'seccion' => 3],
            ['nombre' => 'Galletas de Avena', 'precio' => 1100, 'descripcion' => 'Pack de 6 galletas saludables de avena con pasas y canela', 'seccion' => 3],
            ['nombre' => 'Cookies Doble Chocolate', 'precio' => 1400, 'descripcion' => 'Pack de 6 cookies con chocolate negro y blanco', 'seccion' => 3],
            ['nombre' => 'Galletas de Mantequilla', 'precio' => 1000, 'descripcion' => 'Pack de 6 galletas clásicas de mantequilla danesa', 'seccion' => 3],

            // Panes Artesanales (Sección 4)
            ['nombre' => 'Pan de Centeno', 'precio' => 3200, 'descripcion' => 'Pan artesanal de centeno con semillas de girasol y sésamo', 'seccion' => 4],
            ['nombre' => 'Pan Brioche', 'precio' => 3800, 'descripcion' => 'Pan francés suave y mantecoso, perfecto para desayuno', 'seccion' => 4],
            ['nombre' => 'Pan Integral Multicereal', 'precio' => 3000, 'descripcion' => 'Pan integral con quinoa, chía y semillas variadas', 'seccion' => 4],
            ['nombre' => 'Pan de Nueces', 'precio' => 3500, 'descripcion' => 'Pan rústico con nueces y miel natural', 'seccion' => 4],

            // Postres Fríos (Sección 5)
            ['nombre' => 'Tiramisu Individual', 'precio' => 4500, 'descripcion' => 'Clásico postre italiano con café, mascarpone y cacao', 'seccion' => 5],
            ['nombre' => 'Cheesecake de Frutos Rojos', 'precio' => 5200, 'descripcion' => 'Cheesecake cremoso con coulis de frutos rojos naturales', 'seccion' => 5],
            ['nombre' => 'Panna Cotta de Vainilla', 'precio' => 3800, 'descripcion' => 'Postre italiano cremoso con salsa de frutas de temporada', 'seccion' => 5],
            ['nombre' => 'Mousse de Chocolate', 'precio' => 4000, 'descripcion' => 'Mousse aireado de chocolate belga con crema chantilly', 'seccion' => 5],

            // Tartas (Sección 6)
            ['nombre' => 'Tarta de Manzana', 'precio' => 18000, 'descripcion' => 'Tarta tradicional de manzana con canela y masa quebrada', 'seccion' => 6],
            ['nombre' => 'Tarta de Frutillas', 'precio' => 22000, 'descripcion' => 'Tarta con crema pastelera y frutillas frescas de temporada', 'seccion' => 6],
            ['nombre' => 'Tarta de Limón', 'precio' => 20000, 'descripcion' => 'Tarta cítrica con merengue italiano y base crocante', 'seccion' => 6],

            // Brownies (Sección 7)
            ['nombre' => 'Brownie Clásico', 'precio' => 3200, 'descripcion' => 'Brownie húmedo con nueces y chocolate semi-amargo', 'seccion' => 7],
            ['nombre' => 'Brownie con Dulce de Leche', 'precio' => 3500, 'descripcion' => 'Brownie con swirl de dulce de leche artesanal', 'seccion' => 7],
            ['nombre' => 'Brownie Triple Chocolate', 'precio' => 3800, 'descripcion' => 'Brownie con tres tipos de chocolate y ganache', 'seccion' => 7],

            // Macarons (Sección 8)
            ['nombre' => 'Macarons Surtidos (6 unidades)', 'precio' => 4800, 'descripcion' => 'Selección de 6 macarons: vainilla, chocolate, frambuesa, limón, pistacho y rosa', 'seccion' => 8],
            ['nombre' => 'Macarons de Chocolate (4 unidades)', 'precio' => 3200, 'descripcion' => 'Pack de 4 macarons de chocolate con ganache de chocolate negro', 'seccion' => 8],

            // Empanadas Dulces (Sección 9)
            ['nombre' => 'Empanadas de Manzana', 'precio' => 1800, 'descripcion' => 'Pack de 4 empanadas de manzana con canela y azúcar', 'seccion' => 9],
            ['nombre' => 'Empanadas de Dulce de Leche', 'precio' => 1900, 'descripcion' => 'Pack de 4 empanadas con dulce de leche artesanal', 'seccion' => 9],

            // Especialidades (Sección 10)
            ['nombre' => 'Éclair de Chocolate', 'precio' => 2800, 'descripcion' => 'Clásico éclair francés relleno de crema pastelera y chocolate', 'seccion' => 10],
            ['nombre' => 'Profiterol', 'precio' => 2500, 'descripcion' => 'Masa choux rellena de crema chantilly con salsa de chocolate', 'seccion' => 10],
            ['nombre' => 'Croquembouche Miniatura', 'precio' => 5500, 'descripcion' => 'Torre de profiteroles con caramelo dorado, porción individual', 'seccion' => 10],
        ];

        foreach ($productosData as $index => $prod) {
            Producto::create([
                'idProducto' => $index + 1,
                'NombreProducto' => $prod['nombre'],
                'RutaImagen' => '/images/productos/' . strtolower(str_replace([' ', '(', ')'], ['_', '', ''], $prod['nombre'])) . '.jpg',
                'DescripcionProducto' => $prod['descripcion'],
                'PrecioProducto' => $prod['precio'],
                'Seccion_idSeccion' => $prod['seccion']
            ]);
        }

        // =====================================================
        // CLIENTES DE PRUEBA
        // =====================================================

        $clientesData = [
            ['nombre' => 'Juan Carlos', 'apellido' => 'Pérez González', 'telefono' => '912345678', 'direccion' => 'Av. Providencia 1234, Providencia', 'user_id' => 2],
            ['nombre' => 'María Elena', 'apellido' => 'Silva Torres', 'telefono' => '987654321', 'direccion' => 'Calle Las Flores 567, Ñuñoa', 'user_id' => 3],
            ['nombre' => 'Pedro Antonio', 'apellido' => 'Morales Ruiz', 'telefono' => '956789123', 'direccion' => 'Pasaje Los Aromos 890, La Florida', 'user_id' => 4],
            ['nombre' => 'Ana Carolina', 'apellido' => 'García López', 'telefono' => '923456789', 'direccion' => 'Av. Santa Rosa 2345, San Miguel', 'user_id' => 5],
            ['nombre' => 'Luis Fernando', 'apellido' => 'Díaz Herrera', 'telefono' => '945678912', 'direccion' => 'Calle Principal 678, Maipú', 'user_id' => 6],
        ];

        foreach ($clientesData as $index => $cliente) {
            Cliente::create([
                'idCliente' => $index + 1,
                'NombreCliente' => $cliente['nombre'],
                'CorreoCliente' => 'cliente' . ($index + 1) . '@test.com',
                'RutCliente' => '12345678-' . ($index + 1),
                'NumeroCliente' => $cliente['telefono'],
                'DireccionCliente' => $cliente['direccion'],
                'user_id' => $cliente['user_id']
            ]);
        }

        // =====================================================
        // VENTAS DE PRUEBA
        // =====================================================

        $ventasData = [
            ['numero_transaccion' => 10001234, 'total' => 28000, 'metodo' => 'WebPay', 'estado' => 'Entregado', 'cliente' => 1, 'comentario' => 'Pedido para cumpleaños, entregado sin problemas'],
            ['numero_transaccion' => 10001235, 'total' => 15600, 'metodo' => 'Efectivo', 'estado' => 'Disponible', 'cliente' => 2, 'comentario' => 'Cliente viene a retirar hoy en la tarde'],
            ['numero_transaccion' => 10001236, 'total' => 42500, 'metodo' => 'WebPay', 'estado' => 'En Proceso', 'cliente' => 3, 'comentario' => 'Pedido especial para evento corporativo'],
            ['numero_transaccion' => 10001237, 'total' => 8900, 'metodo' => 'Efectivo', 'estado' => 'Entregado', 'cliente' => 4, 'comentario' => 'Pedido regular semanal'],
            ['numero_transaccion' => 10001238, 'total' => 33200, 'metodo' => 'WebPay', 'estado' => 'Disponible', 'cliente' => 5, 'comentario' => 'Torta de matrimonio, listo para retirar'],
            ['numero_transaccion' => 10001239, 'total' => 19800, 'metodo' => 'WebPay', 'estado' => 'En Proceso', 'cliente' => 1, 'comentario' => 'Segundo pedido del cliente'],
            ['numero_transaccion' => 10001240, 'total' => 7400, 'metodo' => 'Efectivo', 'estado' => 'Cancelado', 'cliente' => 2, 'comentario' => 'Cliente canceló por motivos personales'],
        ];

        foreach ($ventasData as $index => $venta) {
            $fechaCreacion = now()->subDays(random_int(1, 15));
            Venta::create([
                'idVenta' => $index + 1,
                'NumeroTransaccionVenta' => $venta['numero_transaccion'],
                'totalVenta' => $venta['total'],
                'metodoDePagoVenta' => $venta['metodo'],
                'estadoPedido' => $venta['estado'],
                'fechaEntrega' => $fechaCreacion->addDays(random_int(1, 5)),
                'Comentario' => $venta['comentario'],
                'Clientes_idCliente' => $venta['cliente'],
                'created_at' => $fechaCreacion,
                'updated_at' => $fechaCreacion
            ]);
        }

        // =====================================================
        // RELACIONES PRODUCTO-INGREDIENTE (RECETAS)
        // =====================================================

        $recetas = [
            // Torta Tres Leches (producto 1)
            [1, 7, 6], [1, 3, 500], [1, 1, 300], [1, 9, 400], [1, 5, 200],

            // Torta de Chocolate Premium (producto 2)
            [2, 7, 4], [2, 3, 450], [2, 13, 200], [2, 1, 250], [2, 9, 350], [2, 6, 150],

            // Cupcake de Vainilla (producto 7) - para 12 unidades
            [7, 7, 2], [7, 3, 200], [7, 1, 150], [7, 29, 10], [7, 34, 5],

            // Pan Brioche (producto 18)
            [18, 7, 8], [18, 3, 500], [18, 5, 100], [18, 1, 50], [18, 37, 15],

            // Brownie Clásico (producto 26)
            [26, 13, 150], [26, 7, 3], [26, 3, 200], [26, 1, 100], [26, 26, 80],
        ];

        foreach ($recetas as $receta) {
            \DB::table('producto_has_ingrediente')->insert([
                'Producto_idProducto' => $receta[0],
                'Ingrediente_idIngrediente' => $receta[1],
                'cantidad' => $receta[2]
            ]);
        }

        // =====================================================
        // RELACIONES PRODUCTO-VENTA
        // =====================================================

        $productosVenta = [
            // Venta 1 (TXN10001234) - $28,000
            [1, 1, 1], // Torta Tres Leches
            [1, 7, 2], // 2 Cupcakes de Vainilla

            // Venta 2 (TXN10001235) - $15,600
            [2, 12, 6], // 6 Galletas Chispas Chocolate
            [2, 20, 3], // 3 Muffins de Arándanos
            [2, 26, 2], // 2 Brownies Clásicos

            // Venta 3 (TXN10001236) - $42,500
            [3, 3, 1], // Torta Red Velvet
            [3, 14, 6], // 6 Cookies Doble Chocolate

            // Venta 4 (TXN10001237) - $8,900
            [4, 13, 4], // 4 Galletas Chispas Chocolate
            [4, 21, 2], // 2 Muffins de Chocolate
            [4, 17, 1], // Pan de Centeno

            // Venta 5 (TXN10001238) - $33,200
            [5, 6, 1], // Torta de Frutas del Bosque
            [5, 22, 1], // Panna Cotta de Vainilla
        ];

        foreach ($productosVenta as $pv) {
            \DB::table('producto_has_venta')->insert([
                'Venta_idVenta' => $pv[0],
                'Productos_idProducto' => $pv[1],
                'cantidad' => $pv[2]
            ]);
        }

        $this->command->info('✅ Base de datos poblada exitosamente con datos de prueba');
        $this->command->info('👤 Usuario Admin: admin@dolcimimi.com / admin123');
        $this->command->info('🛍️ ' . count($productosData) . ' productos creados');
        $this->command->info('🥄 ' . count($ingredientesData) . ' ingredientes creados');
        $this->command->info('👥 ' . count($clientesData) . ' clientes creados');
        $this->command->info('🛒 ' . count($ventasData) . ' ventas creadas');
    }
}
