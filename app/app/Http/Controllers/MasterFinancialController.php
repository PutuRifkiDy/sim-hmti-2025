<?php
namespace App\Http\Controllers;

use App\Http\Requests\MasterKeuanganRequest;
use App\Http\Resources\MasterFinancialResource;
use App\Http\Resources\MasterPeriodResource;
use App\Models\MasterFinancial;
use App\Models\MasterPeriod;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MasterFinancialController extends Controller
{
    public function index($id): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $months = [
            [
                'id'   => 1,
                'name' => 'Januari',
            ],
            [
                'id'   => 2,
                'name' => 'Februari',
            ],
            [
                'id'   => 3,
                'name' => 'Maret',
            ],
            [
                'id'   => 4,
                'name' => 'April',
            ],
            [
                'id'   => 5,
                'name' => 'Mei',
            ],
            [
                'id'   => 6,
                'name' => 'Juni',
            ],
            [
                'id'   => 7,
                'name' => 'Juli',
            ],
            [
                'id'   => 8,
                'name' => 'Agustus',
            ],
            [
                'id'   => 9,
                'name' => 'September',
            ],
            [
                'id'   => 10,
                'name' => 'Oktober',
            ],
            [
                'id'   => 11,
                'name' => 'November',
            ],
            [
                'id'   => 12,
                'name' => 'Desember',
            ],
        ];

        // urutkan bulan dari januari sampai desember berdasarkan variabel months di atas
        $master_financials = MasterFinancial::with('period')
            ->where('period_id', $id)
            ->get()
            ->sortBy(function ($item) use ($months) {
                return array_search($item->month, array_column($months, 'name'));
            });

        $period = MasterPeriod::find($id);

        return inertia(component: 'MasterFinancial/Index', props: [
            'master_financials' => MasterFinancialResource::collection($master_financials),
            'period'            => fn()            => new MasterPeriodResource($period),
        ]);
    }

    public function create($id): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $months = [
            [
                'id'   => 1,
                'name' => 'Januari',
            ],
            [
                'id'   => 2,
                'name' => 'Februari',
            ],
            [
                'id'   => 3,
                'name' => 'Maret',
            ],
            [
                'id'   => 4,
                'name' => 'April',
            ],
            [
                'id'   => 5,
                'name' => 'Mei',
            ],
            [
                'id'   => 6,
                'name' => 'Juni',
            ],
            [
                'id'   => 7,
                'name' => 'Juli',
            ],
            [
                'id'   => 8,
                'name' => 'Agustus',
            ],
            [
                'id'   => 9,
                'name' => 'September',
            ],
            [
                'id'   => 10,
                'name' => 'Oktober',
            ],
            [
                'id'   => 11,
                'name' => 'November',
            ],
            [
                'id'   => 12,
                'name' => 'Desember',
            ],
        ];

        return inertia(component: 'MasterFinancial/Create', props: [
            'period_id' => $id,
            'months'    => $months,
        ]);
    }

    public function store(MasterKeuanganRequest $request): RedirectResponse
    {
        $master_financial = MasterFinancial::create([
            'title'        => $request->title,
            'month'        => $request->month,
            'total_income' => $request->total_income,
            'period_id'    => $request->period_id,
        ]);

        flashMessage("Keuangan bulan $request->month berhasil ditambahkan", 'success');
        return to_route('master-financial.index', ['id' => $master_financial->period_id]);
    }

    public function edit($id): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $months = [
            [
                'id'   => 1,
                'name' => 'Januari',
            ],
            [
                'id'   => 2,
                'name' => 'Februari',
            ],
            [
                'id'   => 3,
                'name' => 'Maret',
            ],
            [
                'id'   => 4,
                'name' => 'April',
            ],
            [
                'id'   => 5,
                'name' => 'Mei',
            ],
            [
                'id'   => 6,
                'name' => 'Juni',
            ],
            [
                'id'   => 7,
                'name' => 'Juli',
            ],
            [
                'id'   => 8,
                'name' => 'Agustus',
            ],
            [
                'id'   => 9,
                'name' => 'September',
            ],
            [
                'id'   => 10,
                'name' => 'Oktober',
            ],
            [
                'id'   => 11,
                'name' => 'November',
            ],
            [
                'id'   => 12,
                'name' => 'Desember',
            ],
        ];

        $financial = MasterFinancial::find($id);

        return inertia(component: 'MasterFinancial/Edit', props: [
            'financial' => fn() => new MasterFinancialResource($financial),
            'months'    => $months,
        ]);
    }

    public function update(MasterKeuanganRequest $request, $id): RedirectResponse
    {
        $financial = MasterFinancial::find($id);
        $financial->update([
            'title'        => $request->title,
            'month'        => $request->month,
            'total_income' => $request->total_income,
            'period_id'    => $request->period_id,
        ]);

        flashMessage("Keuangan bulan $request->month berhasil diupdate", 'success');
        return to_route('master-financial.index', ['id' => $financial->period_id]);
    }

    public function destroy($id): RedirectResponse
    {
        $financial = MasterFinancial::find($id);
        $financial->delete();
        flashMessage('Financial berhasil dihapus', 'success');
        return to_route('master-financial.index', ['id' => $financial->period_id]);
    }
}
