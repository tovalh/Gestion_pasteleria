<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamps = false;
    protected $table = 'producto';
    protected $primaryKey = 'idProducto';
    protected $fillable = [
        'NombreProducto',


        'DescripcionProducto',
        'PrecioProducto',
        'Seccion_idSeccion',
    ];

    public function ingredientes()
    {
        return $this->belongsToMany(Ingrediente::class, 'producto_has_ingrediente',
            'Producto_idProducto', 'Ingrediente_idIngrediente')
            ->withPivot('cantidad');
    }

    public function ventas()
    {
        return $this->belongsToMany(Venta::class, 'producto_has_venta',
            'Productos_idProducto', 'Venta_idVenta');
    }

}
