<?php
namespace App\Models;

use App\Models\OprecSie;
use App\Models\OprecRegist;
use Illuminate\Database\Eloquent\Model;

class MasterSie extends Model
{
    protected $table = 'master_sies';

    protected $fillable = [
        'sie_name',
    ];

    public function oprec_sies()
    {
        return $this->hasMany(OprecSie::class);
    }

    public function oprec_regists()
    {
        return $this->hasMany(OprecRegist::class);
    }
}
