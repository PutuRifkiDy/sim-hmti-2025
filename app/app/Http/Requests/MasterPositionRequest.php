<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MasterPositionRequest extends FormRequest
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
            'title'     => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9\s]+$/'],
            'parent_id' => ['nullable'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title'     => 'Jabatan',
            'parent_id' => 'Jabatan induk',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Jabatan harus diisi.',
            'title.max'      => 'Jabatan maksimal 255 karakter.',
            'title.string'   => 'Jabatan harus berupa string.',
            'title.regex' => 'Jabatan tidak boleh menggunakan symbol.',
        ];
    }
}
