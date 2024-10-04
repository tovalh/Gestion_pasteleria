<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seccion extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'seccion';
    protected $primaryKey = 'idSeccion';
    protected $fillable = [
        'NombreSeccion',
    ];
}
