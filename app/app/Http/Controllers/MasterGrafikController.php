<?php
namespace App\Http\Controllers;

use App\Http\Resources\MasterPeriodResource;
use App\Models\MasterFinancial;
use App\Models\MasterPeriod;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MasterGrafikController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        //////////////////////////////////
        // untuk grafik periode aktif
        $data_periods = MasterPeriod::get();

        $requestPeriodIdInFrontend = request('period_id');

        if ($requestPeriodIdInFrontend) {
            $periodActive = MasterPeriod::find($requestPeriodIdInFrontend);

            if (! $periodActive) {
                flashMessage('Tidak ada periode himpunan yang ditemukan', 'error');
                return back();
            }
        } else {
            $periodActive = MasterPeriod::where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();
        }

        $monthOrder = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];

        $financialActive = MasterFinancial::where('period_id', $periodActive->id)
            ->get()
            ->sortBy(function ($item) use ($monthOrder) {
                return array_search($item->month, $monthOrder);
            });

        if (! $financialActive) {
            flashMessage('Tidak ada periode himpunan yang aktif', 'error');
            return back();
        }

        // terimakasih saya jadi tahu fungsi baru hehe
        $financialData = $financialActive->pluck('total_income');
        $monthLabels   = $financialActive->pluck('month');

        ///////////////////////////////////
        // untuk grafik perperiode
        $allPeriods = MasterPeriod::get();

        $financialDataAllPeriod = [];
        $periodLabels           = $allPeriods->pluck('title');
        for ($i = 0; $i < count($allPeriods); $i++) {
            $financialDataAllPeriod[$i] = $allPeriods[$i]->financials()->where('month', '=', 'Desember')->pluck('total_income')->first();
        }

        return inertia(component: 'FinancialChart/Index', props: [
            'data_periods'           => MasterPeriodResource::collection($data_periods),
            'periodActive'           => new MasterPeriodResource($periodActive),
            'financialData'          => $financialData,
            'monthLabels'            => $monthLabels,

            'financialDataAllPeriod' => $financialDataAllPeriod,
            'periodLabels'           => $periodLabels,
        ]);
    }
}
