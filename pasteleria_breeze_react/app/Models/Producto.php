<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'producto';
    protected $primaryKey = 'idProducto';
    protected $fillable = [
        'NombreProducto',
        'DescripcionProducto',
        'PrecioProducto',
        'Seccion_idSeccion',
    ];
}
