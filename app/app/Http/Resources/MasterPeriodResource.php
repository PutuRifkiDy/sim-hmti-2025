<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MasterPeriodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'start_date' => $this->start_date ? $this->start_date->format('Y-m-d') : null,
            'end_date'   => $this->end_date ? $this->end_date->format('Y-m-d') : null,
        ];
    }
}
