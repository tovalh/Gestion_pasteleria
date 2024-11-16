<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use SoftDeletes;

    protected $table = 'producto';
    protected $primaryKey = 'idProducto';
    public $timestamps = false;

    protected $fillable = [
        'NombreProducto',
        'DescripcionProducto',
        'PrecioProducto',
        'Seccion_idSeccion',
        'RutaImagen'
    ];

    public function seccion()
    {
        return $this->belongsTo(Seccion::class, 'Seccion_idSeccion', 'idSeccion');
    }

    // Relación con ingredientes
    public function ingredientes()
    {
        return $this->belongsToMany(
            Ingrediente::class,
            'producto_has_ingrediente',
            'Producto_idProducto',
            'Ingrediente_idIngrediente'
        )->withPivot('cantidad');
    }

    public function ventas()
    {
        return $this->belongsToMany(
            Venta::class,
            'producto_has_venta',
            'Productos_idProducto',
            'Venta_idVenta'
        );
    }
}
