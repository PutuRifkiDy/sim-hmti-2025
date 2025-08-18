<?php
namespace App\Http\Controllers;

use App\Http\Resources\HimpunanMemberResource;
use App\Http\Resources\MasterOpenRekruitmenResource;
use App\Http\Resources\MasterPeriodResource;
use App\Http\Resources\MasterProgramKerjaResource;
use App\Models\MasterPeriod;
use App\Models\MasterProgramKerja;
use App\Models\Oprec;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class FrontController extends Controller
{
    public function welcome(): Response | RedirectResponse
    {
        $periode_active = MasterPeriod::with('program_kerjas')
            ->where('start_date', '<=', Carbon::now())
            ->where('end_date', '>=', Carbon::now())
            ->first();

        if (! $periode_active) {
            $periode_active = MasterPeriod::with('program_kerjas')
                ->where('end_date', '<', Carbon::now())
                ->orderBy('end_date', 'desc')
                ->first();
        } else {
            $periode_active = MasterPeriod::with('program_kerjas')
                ->where('start_date', '<=', Carbon::now())
                ->where('end_date', '>=', Carbon::now())
                ->first();
        }

        $program_kerja = $periode_active->program_kerjas()
            ->get()
            ->take(4);

        $fungsionaris = $periode_active->himpunans()->get();

        $oprecs = Oprec::with('oprec_sies')
            ->orderBy("created_at", "desc")
            ->get()
            ->take(10);

        $date_now = Carbon::now()->format('Y-m-d H:i:s');

        return inertia(component: 'Welcome', props: [
            'periode_active' => fn() => new MasterPeriodResource($periode_active),
            'program_kerja'  => MasterProgramKerjaResource::collection($program_kerja),
            'fungsionaris'   => HimpunanMemberResource::collection($fungsionaris),
            'oprecs'         => MasterOpenRekruitmenResource::collection($oprecs),
            'date_now'       => $date_now,
        ]);
    }

    public function programKerja(): Response | RedirectResponse
    {
        $data_periods = MasterPeriod::get();

        $requestPeriodInFrontend = request('period_id');

        if ($requestPeriodInFrontend) {
            $periodActive = MasterPeriod::find($requestPeriodInFrontend);

            if (! $periodActive) {
                flashMessage('Tidak ada periode himpunan yang ditemukan', 'error');
                return back();
            }
        } else {
            $periodActive = MasterPeriod::where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();
        }

        $program_kerja_active = MasterProgramKerja::where('period_id', $periodActive->id)
            ->get();

        return inertia(component: 'ProgramKerja', props: [
            'data_periods'         => MasterPeriodResource::collection($data_periods),
            'periodActive'         => new MasterPeriodResource($periodActive),
            'program_kerja_active' => MasterProgramKerjaResource::collection($program_kerja_active),
        ]);
    }
}
