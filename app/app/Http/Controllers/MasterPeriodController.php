<?php
namespace App\Http\Controllers;

use App\Http\Requests\MasterPeriodeRequest;
use App\Http\Resources\MasterPeriodResource;
use App\Models\MasterPeriod;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MasterPeriodController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $master_periods = MasterPeriod::get();

        return inertia(component: 'MasterPeriod/Index', props: [
            'master_periods' => MasterPeriodResource::collection($master_periods),
        ]);
    }

    public function create(): Response
    {
        return inertia(component: 'MasterPeriod/Create');
    }

    public function store(MasterPeriodeRequest $request): RedirectResponse
    {
        MasterPeriod::create([
            'title'      => $request->title,
            'start_date' => $request->start_date,
            'end_date'   => $request->end_date,
        ]);
        flashMessage("Periode $request->title berhasil ditambahkan", 'success');
        return to_route('master-period.index');
    }

    public function edit($id): Response
    {
        $period = MasterPeriod::find($id);

        return inertia(component: 'MasterPeriod/Edit', props: [
            'period' => fn() => new MasterPeriodResource($period),
        ]);
    }

    public function update(MasterPeriodeRequest $request, $id): RedirectResponse
    {
        $periode = MasterPeriod::find($id);

        $periode->update([
            'title'      => $request->title,
            'start_date' => $request->start_date,
            'end_date'   => $request->end_date,
        ]);

        flashMessage("Periode $request->title berhasil diupdate", 'success');
        return to_route('master-period.index');
    }

    public function destroy($id): RedirectResponse
    {
        $period = MasterPeriod::find($id);
        $period->delete();
        flashMessage("Periode $period->title berhasil dihapus", 'success');
        return to_route('master-period.index');
    }
}
