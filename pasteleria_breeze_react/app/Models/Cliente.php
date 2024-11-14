<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'cliente';
    protected $primaryKey = 'idCliente';

    protected $fillable = [
        'NombreCliente',
        'CorreoCliente',
        'RutCliente',
        'NumeroCliente',
        'DireccionCliente',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ventas()
    {
        return $this->hasMany(Venta::class, 'Clientes_idCliente', 'idCliente');
    }
}
