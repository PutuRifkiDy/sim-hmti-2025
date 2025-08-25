<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MasterProgramKerjaRequest extends FormRequest
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
            'title'       => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9\s-]+$/'],
            'description' => ['required', 'string', 'max:500', 'regex:/^[a-zA-Z0-9\s.,;?-]+$/'],
            'img_path'    => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:1048'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title'       => 'Judul',
            'description' => 'Deskripsi',
            'img_path'    => 'Gambar',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Judul harus diisi.',
            'title.string'         => 'Judul harus berupa string.',
            'title.max'            => 'Judul maksimal 255 karakter.',
            'title.regex' => 'Judul tidak boleh menggunakan symbol.',
            'description.regex' => 'Deskripsi tidak boleh menggunakan symbol',
            'description.required' => 'Deskripsi harus diisi.',
            'description.string'   => 'Deskripsi harus berupa string.',
            'description.max'      => 'Deskripsi maksimal 500 karakter.',
            'img_path'             => 'Gambar wajib diisi, format jpg, jpeg, png, maksimal 1MB.',
        ];
    }
}
