<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'venta';
    protected $primaryKey = 'idVenta';
    protected $fillable = [
        'NumeroTransaccionVenta',
        'totalVenta',
        'metodoDePagoVenta',
        'estadoPedido',
        'Comentario',
        'Clientes_idCliente'
    ];

    // Constantes para los estados y métodos de pago
    const ESTADO_EN_PREPARACION = 'En Preparacion';
    const ESTADO_DISPONIBLE = 'Disponible';
    const ESTADO_ENTREGADO = 'Entregado';
    const ESTADO_CANCELADO = 'Cancelado';

    const METODO_WEBPAY = 'WebPay';
    const METODO_EFECTIVO = 'Efectivo';

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
    public function user()
    {
        return $this->belongsTo(User::class, 'Clientes_idCliente', 'id');
    }
}
