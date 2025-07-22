<?php
namespace App\Models;

use App\Models\OprecRegist;
use App\Models\OprecSie;
use Illuminate\Database\Eloquent\Model;

class Oprec extends Model
{
    protected $table = 'oprecs';

    protected $fillable = [
        'oprec_name',
        'description',
        'start_date',
        'end_date',
        'postmsg',
        'poster_path',
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
