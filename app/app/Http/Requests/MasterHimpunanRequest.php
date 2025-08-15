<?php
namespace App\Http\Requests;

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
        return [
            'user_id'           => ['required', 'array'],
            'user_id.*'         => ['exists:users,id'],
            'position_id'       => ['required', 'exists:master_positions,id'],
            'img_himpunan_path' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1048'],
            // 'periode_id'  => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'img_himpunan_path' => 'Gambar',
            'position_id'       => 'Posisi',
            'user_id'           => 'User',
        ];
    }

    public function messages(): array
    {
        return [
            'img_himpunan_path' => 'Gambar wajib diisi, format jpg, jpeg, png, maksimal 1MB.',
        ];
    }
}
