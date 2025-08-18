<?php
namespace App\Http\Controllers;

use App\Http\Resources\HimpunanMemberResource;
use App\Http\Resources\MasterOpenRekruitmenResource;
use App\Http\Resources\MasterPeriodResource;
use App\Http\Resources\MasterProgramKerjaResource;
use App\Models\MasterPeriod;
use App\Models\Oprec;
use Carbon\Carbon;
use Inertia\Response;

class FrontController extends Controller
{
    public function welcome(): Response
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

        $program_kerja = $periode_active->program_kerjas()->get();

        $fungsionaris = $periode_active->himpunans()->get();

        $oprecs = Oprec::with('oprec_sies')
            ->orderBy("created_at", "desc")
            ->get()
            ->take(5);

        $date_now = Carbon::now()->format('Y-m-d H:i:s');

        return inertia(component: 'Welcome', props: [
            'periode_active' => fn() => new MasterPeriodResource($periode_active),
            'program_kerja'  => MasterProgramKerjaResource::collection($program_kerja),
            'fungsionaris'   => HimpunanMemberResource::collection($fungsionaris),
            'oprecs'         => MasterOpenRekruitmenResource::collection($oprecs),
            'date_now'       => $date_now,
        ]);
    }
}
