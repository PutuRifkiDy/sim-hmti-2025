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
            'title' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'anggaran_dasar' => ['nullable', 'string', 'max:255', 'url', 'regex:^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/preview$^'],
            'anggaran_rumah_tangga' => ['nullable', 'string', 'max:255', 'url', 'regex:^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/preview$^', 'regex:^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/preview$^'],
            'agenda_khusus' => ['nullable', 'string', 'max:255', 'url', 'regex:^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/preview$^'],
            'youtube_link' => ['nullable', 'string', 'max:255', 'url', 'regex:^https?:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+(?:\?.*)?$^'],
            'cover_path' => ['nullable', 'mimes:jpg,jpeg,png,svg', 'max:4048'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'Periode',
            'start_date' => 'Tanggal mulai',
            'end_date' => 'Tanggal selesai',
            'anggaran_dasar' => 'Anggaran dasar',
            'anggaran_rumah_tangga' => 'Anggaran rumah tangga',
            'agenda_khusus' => 'Agenda khusus',
            'youtube_link' => 'Link youtube',
            'cover_path' => 'Cover',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Periode harus diisi.',
            'title.max' => 'Periode maksimal 255 karakter.',
            'title.regex' => 'Periode harus berupa huruf.',
            'start_date.required' => 'Tanggal mulai harus diisi.',
            'end_date.required' => 'Tanggal selesai harus diisi.',
            'start_date.date' => 'Tanggal mulai harus berupa tanggal.',
            'end_date.date' => 'Tanggal selesai harus berupa tanggal.',
            'anggaran_dasar.url' => 'Link Anggaran Dasar harus berupa URL.',
            'anggaran_dasar.regex' => 'Link anggaran dasar harus berupa link google drive file preview.',
            'anggaran_dasar.max' => 'Link Anggaran Dasar maksimal 255 karakter.',
            'anggaran_rumah_tangga.url' => 'Link Anggaran Rumah Tangga harus berupa URL.',
            'anggaran_rumah_tangga.max' => 'Link Anggaran Rumah Tangga maksimal 255 karakter.',
            'anggaran_rumah_tangga.regex' => 'Link anggaran rumah tangga harus berupa link google drive file preview.',
            'agenda_khusus.url' => 'Link Agenda Khusus harus berupa URL.',
            'agenda_khusus.max' => 'Link Agenda Khusus maksimal 255 karakter.',
            'agenda_khusus.regex' => 'Link agenda khusus harus berupa link google drive file preview.',
            'youtube_link.url' => 'Link Youtube harus berupa URL.',
            'youtube_link.max' => 'Link Youtube maksimal 255 karakter.',
            'youtube_link.regex' => 'Link youtube harus berupa link youtube embed.',
            'cover_path' => 'Cover maximal 4048MB dan harus berupa jpg, jpeg, png.',
        ];
    }
}
