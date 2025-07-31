<?php
namespace App\Http\Controllers;

use App\Http\Requests\MasterProgramKerjaRequest;
use App\Http\Resources\MasterPeriodResource;
use App\Http\Resources\MasterProgramKerjaResource;
use App\Models\MasterPeriod;
use App\Models\MasterProgramKerja;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MasterProgramKerjaController extends Controller
{
    use HasFile;
    public function index($idPeriod): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $prokers = MasterProgramKerja::where('period_id', $idPeriod)->with('period')->get();
        $period  = MasterPeriod::find($idPeriod);

        return inertia(component: 'MasterProgramKerja/Index', props: [
            'prokers' => MasterProgramKerjaResource::collection($prokers),
            'period'  => fn()  => new MasterPeriodResource($period),
        ]);
    }

    public function create($idPeriod): Response
    {
        $period = MasterPeriod::find($idPeriod);

        return inertia(component: 'MasterProgramKerja/Create', props: [
            'period' => fn() => new MasterPeriodResource($period),
        ]);
    }

    public function store(MasterProgramKerjaRequest $request, $periodId): RedirectResponse
    {
        MasterProgramKerja::create([
            'title'       => $request->title,
            'description' => $request->description,
            'period_id'   => $periodId,
            'img_path'    => $request->hasFile('img_path') ? $this->upload_file($request, 'img_path', 'program_kerja') : null,
        ]);

        flashMessage('Program Kerja berhasil ditambahkan', 'success');
        return to_route('master-program-kerja.index', ['id' => $periodId]);
    }

    public function edit($id): Response
    {
        $proker = MasterProgramKerja::find($id);

        return inertia(component: 'MasterProgramKerja/Edit', props: [
            'proker' => fn() => new MasterProgramKerjaResource($proker),
        ]);
    }

    public function update(MasterProgramKerjaRequest $request, $id): RedirectResponse
    {
        $proker = MasterProgramKerja::find($id);
        $proker->update([
            'title'       => $request->title,
            'description' => $request->description,
            'img_path'    => $request->hasFile('img_path') ? $this->upload_file($request, 'img_path', 'program_kerja') : $proker->img_path,
        ]);

        flashMessage('Program Kerja ini berhasil diupdate', 'success');
        return to_route('master-program-kerja.index', ['id' => $proker->period_id]);
    }

    public function destroy($id): RedirectResponse
    {
        $proker = MasterProgramKerja::find($id);
        $proker->delete();
        flashMessage('Program Kerja ini berhasil dihapus', 'success');
        return to_route('master-program-kerja.index', ['id' => $proker->period_id]);
    }
}
