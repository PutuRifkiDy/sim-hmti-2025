<?php

namespace App\Models;

use App\Models\MasterPeriod;
use Illuminate\Database\Eloquent\Model;

class MasterFinancial extends Model
{
    protected $fillable = [
        'title',
        'month',
        'total_income',
        'period_id',
    ];

    public function period()
    {
        return $this->belongsTo(MasterPeriod::class, 'period_id');
    }
}
