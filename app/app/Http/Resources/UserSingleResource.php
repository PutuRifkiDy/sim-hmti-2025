<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class UserSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                => $this->id,
            'name'              => $this->name,
            'email'             => $this->email,
            'nim'               => $this->nim,
            'line_id'           => $this->line_id,
            'phone_number'      => $this->phone_number,
            'birthday'          => $this->birthday,
            'address'           => $this->address,
            'username'          => $this->username,
            'img_path'          => $this->img_path ? Storage::url($this->img_path) : null,
            'already_filled'    => $this->already_filled,
            'is_divisi_it'      => $this->when($this->hasRole('divisi_it'), true),
            'is_ketua_kegiatan' => $this->when($this->hasRole('ketua_kegiatan'), true),
            'role'              => $this->getRoleNames()->first(),
        ];
    }
}
