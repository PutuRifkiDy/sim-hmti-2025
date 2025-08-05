<?php

namespace App\Http\Controllers;

use App\Http\Resources\MasterPeriodResource;
use App\Models\MasterPeriod;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ADARTController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $ad_art = MasterPeriod::where('start_date', '<=', Carbon::now())
            ->where('end_date', '>=', Carbon::now())
            ->first();

        if (! $ad_art) {
            flashMessage('Tidak ada periode yang aktif', 'error');
            return back();
        }

        return inertia(component: 'ADART/Index', props: [
            'ad_art' => fn() => new MasterPeriodResource($ad_art),
        ]);
    }
}
