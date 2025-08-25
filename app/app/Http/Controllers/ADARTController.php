<?php
namespace App\Http\Controllers;

use App\Http\Resources\MasterPeriodResource;
use App\Models\MasterPeriod;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ADARTController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $ad_art = MasterPeriod::with('program_kerjas')
            ->where('start_date', '<=', Carbon::now())
            ->where('end_date', '>=', Carbon::now())
            ->first();

        if (! $ad_art) {
            $ad_art = MasterPeriod::with('program_kerjas')
                ->where('end_date', '<', Carbon::now())
                ->orderBy('end_date', 'desc')
                ->first();
        } else {
            $ad_art = MasterPeriod::with('program_kerjas')
                ->where('start_date', '<=', Carbon::now())
                ->where('end_date', '>=', Carbon::now())
                ->first();
        }

        return inertia(component: 'ADART/Index', props: [
            'ad_art' => fn() => $ad_art ? new MasterPeriodResource($ad_art) : null,
        ]);
    }
}
