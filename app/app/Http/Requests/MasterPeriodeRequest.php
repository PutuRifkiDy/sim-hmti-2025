<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MasterPeriodeRequest extends FormRequest
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
            'title'                 => ['required', 'string', 'max:255'],
            'start_date'            => ['required', 'date'],
            'end_date'              => ['required', 'date'],
            'anggaran_dasar'        => ['nullable', 'string', 'max:255', 'url'],
            'anggaran_rumah_tangga' => ['nullable', 'string', 'max:255', 'url'],
            'agenda_khusus'         => ['nullable', 'string', 'max:255', 'url'],
            'youtube_link'          => ['nullable', 'string', 'max:255', 'url'],
            'cover_path'            => ['nullable', 'mimes:jpg,jpeg,png', 'max:1048'],
        ];
    }
}
