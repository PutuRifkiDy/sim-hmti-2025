<?php
namespace App\Models;

use App\Models\User;
use App\Models\MasterPeriod;
use App\Models\MasterPosition;
use Illuminate\Database\Eloquent\Model;

class Himpunan extends Model
{
    protected $table = 'himpunans';

    protected $fillable = [
        'position_id',
        'period_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function position()
    {
        return $this->belongsTo(MasterPosition::class);
    }

    public function period()
    {
        return $this->belongsTo(MasterPeriod::class);
    }
}
