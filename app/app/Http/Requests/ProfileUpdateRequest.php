<?php
namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->user();
        return [
            'name'           => ['required', 'string', 'max:255'],
            'email'          => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'nim'            => ['required', 'string', 'max:10', Rule::unique(User::class, 'nim')->ignore($this->user()->id)],
            'line_id'        => ['required', 'string', 'max:255'],
            'phone_number'   => ['required', 'string', 'max:15'],
            'birthday'       => ['required', 'date'],
            'address'        => ['required', 'string', 'max:255'],
            'username'       => ['required', 'string', 'max:255', Rule::unique(User::class, 'username')->ignore($this->user()->id)],
            'img_path'       => [
                Rule::requiredIf(! $user->img_path),
                'mimes:jpg,jpeg,png',
                'max:1048',
            ],
            'already_filled' => ['nullable', 'boolean'],
        ];
    }

    public function attributes()
    {
        return [
            'name'           => 'Nama',
            'email'          => 'Email',
            'nim'            => 'NIM',
            'line_id'        => 'Line ID',
            'phone_number'   => 'Nomor Telepon',
            'birthday'       => 'Tanggal Lahir',
            'address'        => 'Alamat',
            'username'       => 'Username',
            'img_path'       => 'Foto',
        ];
    }

    // ubah kalimat validasi
    public function messages()
    {
        return [
            'name'           => 'Nama harus diisi.',
            'email'          => 'Email harus diisi.',
            'nim'            => 'NIM harus diisi.',
            'line_id'        => 'Line ID harus diisi.',
            'phone_number'   => 'Nomor Telepon harus diisi.',
            'birthday'       => 'Tanggal Lahir harus diisi.',
            'address'        => 'Alamat harus diisi.',
            'username'       => 'Username harus diisi.',
            'img_path'       => 'Foto harus diisi.',
        ];
    }
}
