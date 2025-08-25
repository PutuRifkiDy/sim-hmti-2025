<?php
namespace App\Http\Controllers;

use App\Http\Requests\MasterPeriodeRequest;
use App\Http\Resources\MasterPeriodResource;
use App\Models\Himpunan;
use App\Models\MasterPeriod;
use App\Models\MasterProgramKerja;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MasterPeriodController extends Controller
{
    use HasFile;
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $master_periods     = MasterPeriod::get();
        $total_period       = MasterPeriod::count();
        $total_fungsionaris = Himpunan::count();
        $total_programkerja = MasterProgramKerja::count();

        return inertia(component: 'MasterPeriod/Index', props: [
            'master_periods'     => MasterPeriodResource::collection($master_periods),
            'total_period'       => $total_period,
            'total_fungsionaris' => $total_fungsionaris,
            'total_programkerja' => $total_programkerja,
        ]);
    }

    public function create(): Response
    {
        return inertia(component: 'MasterPeriod/Create');
    }

    public function store(MasterPeriodeRequest $request): RedirectResponse
    {
        MasterPeriod::create([
            'title'                 => $request->title,
            'start_date'            => $request->start_date,
            'end_date'              => $request->end_date,
            'anggaran_dasar'        => $request->anggaran_dasar,
            'anggaran_rumah_tangga' => $request->anggaran_rumah_tangga,
            'agenda_khusus'         => $request->agenda_khusus,
            'youtube_link'          => $request->youtube_link,
            'cover_path'            => $request->hasFile('cover_path') ? $this->upload_file($request, 'cover_path', 'cover_period') : null,
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
            'title'                 => $request->title,
            'start_date'            => $request->start_date,
            'end_date'              => $request->end_date,
            'anggaran_dasar'        => $request->anggaran_dasar,
            'anggaran_rumah_tangga' => $request->anggaran_rumah_tangga,
            'agenda_khusus'         => $request->agenda_khusus,
            'youtube_link'          => $request->youtube_link,
            'cover_path'            => $request->hasFile('cover_path') ? $this->upload_file($request, 'cover_path', 'cover_period') : $periode->cover_path,
        ]);

        flashMessage("Periode ini berhasil diupdate", 'success');
        return to_route('master-period.index');
    }

    public function destroy($id): RedirectResponse
    {
        $period = MasterPeriod::find($id);
        $this->delete_file($period, 'cover_path');

        $period->delete();
        flashMessage("Periode $period->title berhasil dihapus", 'success');
        return to_route('master-period.index');
    }
}
