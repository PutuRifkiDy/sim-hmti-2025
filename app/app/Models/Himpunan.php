<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Himpunan extends Model
{
    protected $table = 'himpunans';

    protected $fillable = [
        'position_id',
        'period_id',
        'user_id',
    ];
}
