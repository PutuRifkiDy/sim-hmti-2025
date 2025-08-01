<?php
namespace App\Http\Resources;

use App\Http\Resources\MasterOpenRekruitmenResource;
use App\Http\Resources\MasterSieResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OprecSieResource extends JsonResource
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
            'oprec_id'   => $this->oprec_id,
            'sie_id'     => $this->sie_id,
            'master_sie' => MasterSieResource::make($this->master_sie),
            'oprec'      => MasterOpenRekruitmenResource::make($this->oprec),
        ];
    }
}
