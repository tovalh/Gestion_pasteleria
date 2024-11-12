<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    protected $table = 'administrador';
    protected $primaryKey = 'idAdministrador';
    public $timestamps = false;

    protected $fillable = [
        'NombreUsuario',
        'ClaveUsuario',
        'email'  // Necesitamos añadir este campo
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
}
