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
            'cover_path'            => ['nullable', 'mimes:jpg,jpeg,png', 'max:4048'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title'                 => 'Periode',
            'start_date'            => 'Tanggal mulai',
            'end_date'              => 'Tanggal selesai',
            'anggaran_dasar'        => 'Anggaran dasar',
            'anggaran_rumah_tangga' => 'Anggaran rumah tangga',
            'agenda_khusus'         => 'Agenda khusus',
            'youtube_link'          => 'Link youtube',
            'cover_path'            => 'Cover',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'            => 'Periode harus diisi.',
            'title.max'                 => 'Periode maksimal 255 karakter.',
            'start_date.required'       => 'Tanggal mulai harus diisi.',
            'end_date.required'         => 'Tanggal selesai harus diisi.',
            'start_date.date'           => 'Tanggal mulai harus berupa tanggal.',
            'end_date.date'             => 'Tanggal selesai harus berupa tanggal.',
            'anggaran_dasar.url'        => 'Link Anggaran Dasar harus berupa URL.',
            'anggaran_dasar.max'        => 'Link Anggaran Dasar maksimal 255 karakter.',
            'anggaran_rumah_tangga.url' => 'Link Anggaran Rumah Tangga harus berupa URL.',
            'anggaran_rumah_tangga.max' => 'Link Anggaran Rumah Tangga maksimal 255 karakter.',
            'agenda_khusus.url'         => 'Link Agenda Khusus harus berupa URL.',
            'agenda_khusus.max'         => 'Link Agenda Khusus maksimal 255 karakter.',
            'youtube_link.url'          => 'Link Youtube harus berupa URL.',
            'youtube_link.max'          => 'Link Youtube maksimal 255 karakter.',
            'cover_path.mimes'          => 'Cover maximal 1MB dan harus berupa jpg, jpeg, png.',
        ];
    }
}
