<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HimpunanUpdateRequest extends FormRequest
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
        return [
            'user_id'           => ['required', 'exists:users,id'],
            'position_id'       => ['required', 'exists:master_positions,id'],
            'img_himpunan_path' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1048'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required'           => 'User ID harus diisi.',
            'user_id.exists'             => 'User ID tidak valid.',
            'position_id.required'       => 'Posisi harus diisi.',
            'position_id.exists'         => 'Posisi tidak valid.',
            'img_himpunan_path.mimes'    => 'Format gambar harus berupa JPG, JPEG, atau PNG.',
            'img_himpunan_path.max'      => 'Ukuran gambar tidak boleh lebih besar dari 1 MB.',
        ];
    }
}
