<?php
namespace App\Http\Requests;

use App\Models\MasterFinancial;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MasterKeuanganRequest extends FormRequest
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
            'title'        => ['nullable', 'string', 'max:255'],
            'month'        => [
                'required',
                'string',
                'max:255',
                Rule::unique(MasterFinancial::class, 'month')->ignore($this->route('id')),],
            'total_income' => ['required', 'string', 'max:255'],
            'period_id'    => ['required'],
        ];
    }
}
