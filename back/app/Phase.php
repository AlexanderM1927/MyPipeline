<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'phases';
    
    protected $fillable = [
        'proyecto_id', 'name', 'commentary', 'color'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
}
