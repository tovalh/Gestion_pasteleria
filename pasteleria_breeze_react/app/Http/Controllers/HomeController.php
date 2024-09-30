<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
class HomeController
{
    public function index()
    {
        $products = [
            ['name' => 'Chocolate Strawberry Cake', 'description' => 'A delicious chocolate cake topped with fresh strawberries', 'img'=>'/images/chocolate-cake.jpg'],
            ['name' => 'Vanilla Sprinkle Cake', 'description' => 'A classic vanilla cake with a festive sprinkle topping', 'img'=>'/images/maracuya-cake.jpg'],
            ['name' => 'Fresh Fruit Tart', 'description' => 'A tangy fruit tart filled with custard and topped with fresh fruits', 'img'=>'/images/cool-cake.jpg'],
        ];

        return Inertia::render('Inicio', [
            'products' => $products
        ]);
    }
}
