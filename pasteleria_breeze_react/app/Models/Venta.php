<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venta extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamps = false;
    protected $table = 'venta';
    protected $primaryKey = 'idVenta';
    protected $fillable = [
        'NumeroTransaccionVenta',
        'totalVenta',
        'metodoDePagoVenta',
        'estadoPedido',
        'Comentario'
    ];

    public function productos()
    {
        return $this->belongsToMany(
            Producto::class,
            'producto_has_venta',
            'Venta_idVenta',
            'Productos_idProducto'
        );
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'Clientes_idCliente', 'idCliente');
    }
}
