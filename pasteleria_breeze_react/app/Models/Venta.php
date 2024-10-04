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
    ];
}
