<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proyect extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'proyects';
    
    protected $fillable = [
        'cliente_id', 'name', 'descripcion', 'linea', 'monto'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
}
