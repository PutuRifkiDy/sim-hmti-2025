<?php
namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MasterUserUpdateRequest extends FormRequest
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
        $user = User::findOrFail($this->route('id'));
        return [
            'name'         => ['required', 'string', 'max:255'],
            'email'        => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->route('id')),
            ],
            'nim'          => ['required', 'string', 'max:10', Rule::unique(User::class, 'nim')->ignore($this->route('id'))],
            'line_id'      => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:15'],
            'birthday'     => ['required', 'date'],
            'address'      => ['required', 'string', 'max:255'],
            'username'     => ['required', 'string', 'max:255', Rule::unique(User::class, 'username')->ignore($this->route('id'))],
            'img_path'     => [
                Rule::requiredIf(! $user->img_path),
                'mimes:jpg,jpeg,png',
                'max:1048',
            ],
            'role'         => ['nullable', 'string', 'in:guest,divisi_it,ketua_kegiatan'],
        ];
    }

    public function attributes()
    {
        return [
            'name'         => 'Nama',
            'email'        => 'Email',
            'nim'          => 'NIM',
            'line_id'      => 'Line ID',
            'phone_number' => 'Nomor Telepon',
            'birthday'     => 'Tanggal Lahir',
            'address'      => 'Alamat',
            'username'     => 'Username',
            'img_path'     => 'Foto',
        ];
    }

    // ubah kalimat validasi
    public function messages()
    {
        return [
            'name'                  => 'Nama harus diisi.',
            'email.required'        => 'Email harus diisi.',
            'email.unique'          => 'Email sudah terdaftar',
            'email.email'           => 'Email tidak valid.',
            'email.max'             => 'Email maksimal 255 karakter.',
            'email.lowercase'       => 'Email harus berupa huruf kecil.',
            'email.string'          => 'Email harus berupa string.',
            'nim.required'          => 'NIM harus diisi.',
            'nim.max'               => 'NIM maksimal 10 karakter.',
            'nim.unique'            => 'NIM sudah terdaftar.',
            'line_id.required'      => 'Line ID harus diisi.',
            'line_id.max'           => 'Line ID maksimal 255 karakter.',
            'line_id.string'        => 'Line ID harus berupa string.',
            'phone_number.required' => 'Nomor Telepon harus diisi.',
            'phone_number.max'      => 'Nomor Telepon maksimal 15 karakter.',
            'phone_number.string'   => 'Nomor Telepon harus berupa string.',
            'birthday.required'     => 'Tanggal Lahir harus diisi.',
            'birthday.date'         => 'Tanggal Lahir harus berupa tanggal.',
            'address.required'      => 'Alamat harus diisi.',
            'address.string'        => 'Alamat harus berupa string.',
            'address.max'           => 'Alamat maksimal 255 karakter.',
            'username.required'     => 'Username harus diisi.',
            'username.max'          => 'Username maksimal 255 karakter.',
            'username.unique'       => 'Username sudah terdaftar.',
            'img_path'              => 'Foto wajib diisi, format jpg, jpeg, png, maksimal 1MB.',
        ];
    }
}
