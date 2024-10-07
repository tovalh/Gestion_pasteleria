<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingrediente extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamps = false;

    protected $table = "ingrediente";
    protected $primaryKey = "idIngrediente";

    protected $fillable = [
        'NombreIngrediente',
        'StockIngrediente',
        'StockMinimoIngrediente',
        'UnidadDeMedidaIngrediente',
    ];
}