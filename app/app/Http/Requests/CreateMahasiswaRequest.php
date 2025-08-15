<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMahasiswaRequest extends FormRequest
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
            'angkatan' => 'required|digits:2',
            'start'    => 'required|integer|min:1',
            'end'      => 'required|integer|gte:start|max:999',
        ];
    }

    public function attributes(): array
    {
        return [
            'angkatan' => 'Angkatan',
            'start'    => 'Mulai',
            'end'      => 'Selesai',
        ];
    }

    public function messages(): array
    {
        return [
            'angkatan.required' => 'Angkatan harus diisi.',
            'angkatan.digits'   => 'Angkatan harus berupa angka 2 digit.',
            'start.required'    => 'Mulai harus diisi.',
            'start.integer'     => 'Mulai harus berupa angka.',
            'start.min'         => 'Mulai harus lebih besar atau sama dengan 1.',
            'end.required'      => 'Selesai harus diisi.',
            'end.integer'       => 'Selesai harus berupa angka.',
            'end.gte'           => 'Selesai harus lebih besar atau sama dengan Mulai.',
            'end.max'           => 'Selesai harus lebih kecil atau sama dengan 999.',
        ];
    }
}
