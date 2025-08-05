<?php
namespace App\Http\Resources;

use App\Http\Resources\MasterPeriodResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MasterFinancialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $total_income = number_format($this->total_income);
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'month'        => $this->month,
            'total_income' => $total_income,
            'period_id'    => $this->period_id,
            'period'       => MasterPeriodResource::make($this->period),
        ];
    }
}
