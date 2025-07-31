<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterProgramKerja extends Model
{
    protected $table = 'master_program_kerjas';
    protected $fillable = [
        'title',
        'description',
        'img_path',
        'period_id',
    ];

    public function period()
    {
        return $this->belongsTo(MasterPeriod::class);
    }
}
