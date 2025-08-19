<?php
namespace App\Models;

use App\Models\Himpunan;
use Illuminate\Database\Eloquent\Model;

class MasterPosition extends Model
{
    protected $table = 'master_positions';

    protected $fillable = [
        'title',
        'parent_id',
        'is_active',
    ];

    public function himpunans()
    {
        return $this->hasMany(Himpunan::class, 'position_id');
    }

    public function children()
    {
        return $this->hasMany(MasterPosition::class, 'parent_id')
            ->with('children', 'himpunans.user');
    }
}
