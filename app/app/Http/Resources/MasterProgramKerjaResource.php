<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class MasterProgramKerjaResource extends JsonResource
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
            'title'       => $this->title,
            'description' => $this->description,
            'img_path'    => $this->img_path ? Storage::url($this->img_path) : null,
            'period_id'   => $this->period_id,
            'period'      => MasterPeriodResource::make($this->period),
        ];
    }
}
