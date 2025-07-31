<?php
namespace App\Models;

use App\Models\Himpunan;
use Illuminate\Database\Eloquent\Model;

class MasterPeriod extends Model
{
    protected $table = 'master_periods';

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
    ];

    public function himpunans()
    {
        return $this->hasMany(Himpunan::class);
    }

    public function program_kerjas()
    {
        return $this->hasMany(MasterProgramKerja::class);
    }

}
