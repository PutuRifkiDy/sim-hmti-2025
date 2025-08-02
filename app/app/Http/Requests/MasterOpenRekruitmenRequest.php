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
            'oprec_name'  => ['required', 'max:255'],
            'description' => ['required', 'max:60000'],
            'start_date'  => ['required', 'date'],
            'end_date'    => ['required', 'date'],
            'poster_path' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1048'],
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
}
