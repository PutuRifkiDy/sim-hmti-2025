<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Oprec extends Model
{
    protected $table = 'oprecs';

    protected $fillable = [
        'oprec_name',
        'description',
        'start_date',
        'end_date',
        'postmsg',
        'poster_path'
    ];
}
