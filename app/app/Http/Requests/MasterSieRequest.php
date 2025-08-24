<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MasterSieRequest extends FormRequest
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
            'sie_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/', 'unique:master_sies'],
        ];
    }

    public function attributes(): array
    {
        return [
            'sie_name' => 'Sie',
        ];
    }

    public function messages(): array
    {
        return [
            'sie_name.required' => 'Nama sie harus diisi.',
            'sie_name.string'   => 'Nama sie harus berupa string.',
            'sie_name.max'      => 'Nama sie maksimal 255 karakter.',
            'sie_name.regex'    => 'Nama sie harus berupa huruf dan tidak boleh ada symbol.',
            'sie_name.unique'   => 'Nama sie sudah terdaftar.',
        ];
    }
}
