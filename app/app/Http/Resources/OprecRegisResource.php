<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\MasterSieResource;
use App\Http\Resources\UserSingleResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\MasterOpenRekruitmenResource;

class OprecRegisResource extends JsonResource
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
            'reason_join' => $this->reason_join,
            'experience'  => $this->experience,
            'sie_id'      => $this->sie_id,
            'oprec_id'    => $this->oprec_id,
            'user_id'     => $this->user_id,
            'user'        => UserSingleResource::make($this->user),
            'master_sie'  => MasterSieResource::make($this->master_sie),
            'oprec'       => MasterOpenRekruitmenResource::make($this->oprec),
        ];
    }
}
