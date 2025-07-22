<?php
namespace App\Models;

use App\Models\MasterSie;
use App\Models\Oprec;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class OprecRegist extends Model
{
    protected $table = 'oprec_regists';

    protected $fillable = [
        'reason_join',
        'experience',
        'sie_id',
        'oprec_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function oprec()
    {
        return $this->belongsTo(Oprec::class);
    }

    public function master_sie()
    {
        return $this->belongsTo(MasterSie::class);
    }
}
