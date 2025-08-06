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
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'month'        => $this->month,
            'total_income' => $this->total_income,
            'period_id'    => $this->period_id,
            'period'       => MasterPeriodResource::make($this->period),
        ];
    }
}
