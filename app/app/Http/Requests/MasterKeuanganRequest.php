<?php
namespace App\Http\Requests;

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
                Rule::unique('master_financials', 'month')
                    ->where(function ($query) {
                        return $query->where('period_id', $this->period_id);
                    })
                    ->ignore($this->route('id')),
            ],
            'total_income' => ['required', 'numeric', 'max:2147483647'],
            'period_id'    => ['required'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title'        => 'Judul',
            'month'        => 'Bulan',
            'total_income' => 'Pendapatan',
            'period_id'    => 'Periode',
        ];
    }

    public function messages(): array
    {
        return [
            'title.string'          => 'Judul harus berupa string',
            'title.max'             => 'Judul maksimal 255 karakter',
            'month.string'          => 'Bulan harus berupa string',
            'month.required'        => 'Bulan harus diisi',
            'month.max'             => 'Bulan maksimal 255 karakter',
            'total_income.required' => 'Pendapatan harus diisi',
            'total_income.numeric'  => 'Pendapatan harus berupa angka',
            'total_income.max'      => 'Pendapatan maksimal 2147483647',
            'period_id.required'    => 'Periode harus diisi',
        ];
    }
}
