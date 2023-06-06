<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'clients';
    
    protected $fillable = [
        'usuario_id', 'name', 'sector', 'ciudad', 'direccion', 'contacto', 'cargo', 'celular', 'correo', 'numeroventas'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
}
