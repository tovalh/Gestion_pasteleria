<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingrediente extends Model
{
    use HasFactory;
    protected $table = "ingrediente";
    protected $primaryKey = "idIngrediente";

    protected $fillable = [
        'NombreIngrediente',
        'StockIngrediente',
        'StockMinimoIngrediente',
        'UnidadDeMedidaIngrediente',
    ];
}
