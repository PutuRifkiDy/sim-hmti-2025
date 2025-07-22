<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterPosition extends Model
{
    protected $table = 'master_positions';

    protected $fillable = [
        'title',
        'parent_id',
        'is_active',
    ];
}
