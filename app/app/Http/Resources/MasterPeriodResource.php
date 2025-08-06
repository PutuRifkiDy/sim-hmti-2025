<?php
namespace App\Http\Resources;

use Storage;
use Illuminate\Http\Request;
use App\Http\Resources\MasterFinancialResource;
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
            'id'                    => $this->id,
            'title'                 => $this->title,
            'start_date'            => $this->start_date,
            'end_date'              => $this->end_date,
            'anggaran_dasar'        => $this->anggaran_dasar,
            'anggaran_rumah_tangga' => $this->anggaran_rumah_tangga,
            'agenda_khusus'         => $this->agenda_khusus,
            'youtube_link'          => $this->youtube_link,
            'cover_path'            => $this->cover_path ? Storage::url($this->cover_path) : null,
            // 'financials'            => MasterFinancialResource::make($this->financials),
        ];
    }
}
