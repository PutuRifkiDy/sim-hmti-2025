<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MasterOpenRekruitmenRequest extends FormRequest
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
            'sie_id'      => ['required', 'array'],
            'oprec_name'  => ['required', 'max:255', 'regex:/^[a-zA-Z0-9\s]+$/'],
            'description' => ['required', 'max:60000'],
            'start_date'  => ['required', 'date'],
            'end_date'    => ['required', 'date'],
            'poster_path' => ['nullable', 'mimes:jpg,jpeg,png', 'max:4048'],
            'postmsg'     => ['required', 'max:255'],
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('sie_id')) {
            $this->merge([
                'sie_id' => array_map('intval', $this->sie_id),
            ]);
        }
    }

    public function attributes(): array
    {
        return [
            'sie_id'      => 'Sie',
            'oprec_name'  => 'Nama Oprec',
            'description' => 'Deskripsi',
            'start_date'  => 'Tanggal mulai',
            'end_date'    => 'Tanggal selesai',
            'poster_path' => 'Poster',
            'postmsg'     => 'Pesan',
        ];
    }

    public function messages(): array
    {
        return [
            'sie_id.required'      => 'Sie harus diisi.',
            'sie_id.array'         => 'Sie harus berupa array.',
            'oprec_name.required'  => 'Nama Oprec harus diisi.',
            'oprec_name.max'       => 'Nama Oprec maksimal 255 karakter.',
            'oprec_name.regex'     => 'Nama Oprec harus berupa huruf.',
            'description.required' => 'Deskripsi harus diisi.',
            'description.max'      => 'Deskripsi maksimal 60000 karakter.',
            'start_date.required'  => 'Tanggal mulai harus diisi.',
            'start_date.date'      => 'Tanggal mulai harus berupa tanggal.',
            'end_date.required'    => 'Tanggal selesai harus diisi.',
            'end_date.date'        => 'Tanggal selesai harus berupa tanggal.',
            'poster_path'          => 'Poster maksimal 1048 karakter, format jpg, jpeg, png.',
            'postmsg.required'     => 'Pesan harus diisi.',
            'postmsg.max'          => 'Pesan maksimal 255 karakter.',
        ];
    }
}
