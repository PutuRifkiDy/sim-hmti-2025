<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class HimpunanMemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'position_id' => $this->position_id,
            'user_id'     => $this->user_id,
            'period_id'   => $this->period_id,
            'img_himpunan_path' => $this->img_himpunan_path ? Storage::url($this->img_himpunan_path) : null,
            'position'    => MasterPositionResource::make($this->position),
            'user'        => UserSingleResource::make($this->user),
            'period'      => MasterPeriodResource::make($this->period),
        ];
    }
}
