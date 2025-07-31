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
            'user_id' => ['required', 'exists:users,id'],
            'position_id' => ['required', 'exists:master_positions,id'],
            'img_himpunan_path' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1048'],
        ];
    }
}
