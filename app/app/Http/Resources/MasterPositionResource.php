<?php
namespace App\Http\Resources;

use App\Models\MasterPosition;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MasterPositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $master_positions = MasterPosition::get();
        $master_position = [];
        foreach ($master_positions as $position) {
            if ($position->id == $this->parent_id) {
                $master_position = [
                    'id'    => $position->id,
                    'title' => $position->title,
                ];
            }
        }
        return [
            'id'        => $this->id,
            'title'     => $this->title,
            'parent_id' => $this->parent_id,
            'is_active' => $this->is_active,
            'parents'   => $master_position,
        ];
    }
}
