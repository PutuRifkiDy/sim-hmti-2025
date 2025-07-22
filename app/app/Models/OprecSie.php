<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OprecSie extends Model
{
    protected $table ="oprec_sies";

    protected $fillable = [
        'oprec_id',
        'sie_id',
    ];
}
