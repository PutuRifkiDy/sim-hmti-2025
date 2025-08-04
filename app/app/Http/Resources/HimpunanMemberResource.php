<?php
namespace App\Http\Resources;

use Storage;
use Illuminate\Http\Request;
use App\Http\Resources\UserSingleResource;
use App\Http\Resources\MasterPeriodResource;
use App\Http\Resources\MasterPositionResource;
use Illuminate\Http\Resources\Json\JsonResource;

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
