<?php
namespace App\Models;

use App\Models\Himpunan;
use App\Models\MasterFinancial;
use App\Models\MasterProgramKerja;
use Illuminate\Database\Eloquent\Model;

class MasterPeriod extends Model
{
    protected $table = 'master_periods';

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'anggaran_dasar',
        'anggaran_rumah_tangga',
        'agenda_khusus',
        'youtube_link',
        'cover_path',
    ];

    public function himpunans()
    {
        return $this->hasMany(Himpunan::class, 'period_id');
    }

    public function program_kerjas()
    {
        return $this->hasMany(MasterProgramKerja::class, 'period_id');
    }

    public function financials()
    {
        return $this->hasMany(MasterFinancial::class, 'period_id');
    }

}
