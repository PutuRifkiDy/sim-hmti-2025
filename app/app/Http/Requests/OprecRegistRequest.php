<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OprecRegistRequest extends FormRequest
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
            'reason_join' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9\s.,;?-]+$/'],
            'experience'  => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9\s.,;?-]+$/'],
            'sie_id'      => ['required'],
            'oprec_id'    => ['required'],
            'user_id'     => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'reason_join' => 'Alasan bergabung',
            'experience'  => 'Pengalaman',
            'sie_id'      => 'Himpunan',
            'oprec_id'    => 'Oprec',
            'user_id'     => 'User',
        ];
    }

    public function messages()
    {
        return [
            'reason_join.required' => 'Alasan bergabung harus diisi.',
            'reason_join.string'   => 'Alasan bergabung harus berupa string.',
            'reason_join.max'      => 'Alasan bergabung maksimal 255 karakter.',
            'reason_join.regex'    => 'Alasan bergabung harus berupa huruf.',
            'experience.required'  => 'Pengalaman harus diisi.',
            'experience.string'    => 'Pengalaman harus berupa string.',
            'experience.max'       => 'Pengalaman maksimal 255 karakter.',
            'experience.regex'     => 'Pengalaman harus berupa huruf.',
            'sie_id.required'      => 'Sie harus diisi.',
            'oprec_id.required'    => 'Oprec harus diisi.',
            'user_id.required'     => 'User harus diisi.',
        ];
    }
}
