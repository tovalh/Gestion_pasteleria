<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingrediente extends Model
{
    use HasFactory;
    protected $table = "ingredientes";
    protected $primaryKey = "idIngredientes";
    protected $fillable = [
      'NombreIngrediente',
      'StockIngrediente',
      'AlertaStockIngrediente',
      'UnidadDeMedidaIngrediente',
    ];
}
