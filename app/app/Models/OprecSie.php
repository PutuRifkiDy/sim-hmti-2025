<?php
namespace App\Models;

use App\Models\MasterSie;
use App\Models\Oprec;
use Illuminate\Database\Eloquent\Model;

class OprecSie extends Model
{
    protected $table ="oprec_sies";

    protected $fillable = [
        'oprec_id',
        'sie_id',
    ];

    public function oprec()
    {
        return $this->belongsTo(Oprec::class);
    }

    public function master_sie()
    {
        return $this->belongsTo(MasterSie::class);
    }
}
