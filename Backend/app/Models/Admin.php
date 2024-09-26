<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    protected $table = 'administrador';
    protected $primaryKey = 'idAdministrador';
    protected $fillable = [
      'NombreUsuario',
      'ClaveUsuario',
    ];
}
