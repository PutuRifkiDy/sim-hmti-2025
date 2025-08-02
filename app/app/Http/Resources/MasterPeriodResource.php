<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

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
            'id'                    => $this->id,
            'title'                 => $this->title,
            'start_date'            => $this->start_date ? $this->start_date->format('Y-m-d') : null,
            'end_date'              => $this->end_date ? $this->end_date->format('Y-m-d') : null,
            'anggaran_dasar'        => $this->anggaran_dasar,
            'anggaran_rumah_tangga' => $this->anggaran_rumah_tangga,
            'agenda_khusus'         => $this->agenda_khusus,
            'youtube_link'          => $this->youtube_link,
            'cover_path'            => $this->cover_path ? Storage::url($this->cover_path) : null,
        ];
    }
}
