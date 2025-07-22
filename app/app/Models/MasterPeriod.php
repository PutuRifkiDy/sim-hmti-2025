<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterPeriod extends Model
{
    protected $table = 'master_periods';

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
    ];
}
