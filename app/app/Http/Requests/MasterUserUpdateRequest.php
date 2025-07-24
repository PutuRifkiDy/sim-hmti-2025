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
        ];
    }
}
