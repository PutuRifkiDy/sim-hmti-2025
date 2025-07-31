<?php
namespace App\Http\Requests;

use App\Models\MasterPosition;
use Illuminate\Foundation\Http\FormRequest;

class MasterHimpunanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // anggota bisa lebih dari 1, kecuali jabatan selain anggota
        // position selain anggota hanya bisa 1 orang yang menjabat
        // 1 user 1 jabatan
        return [
            'user_id'           => ['required', 'array'],
            'user_id.*'         => ['exists:users,id'],
            'position_id'       => ['required', 'exists:master_positions,id'],
            'img_himpunan_path' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1048'],
            // 'periode_id'  => ['required'],
        ];
    }
}
