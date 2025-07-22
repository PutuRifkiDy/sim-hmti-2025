<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterSie extends Model
{
    protected $table = 'master_sies';

    protected $fillable = [
        'sie_name',
    ];
}
