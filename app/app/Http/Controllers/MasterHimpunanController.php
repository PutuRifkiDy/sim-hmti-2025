<?php

namespace App\Http\Controllers;

use App\Http\Resources\HimpunanMemberResource;
use App\Http\Resources\MasterPositionResource;
use App\Models\Himpunan;
use App\Models\MasterPosition;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class MasterHimpunanController extends Controller
{
    public function index($id): Response|RedirectResponse
    {
        $user_login = auth()->user();
        if (! $user_login) {
            return to_route('login');
        }

        $himpunan_members_in_this_periode = Himpunan::where('period_id', $id)->get();
        $positions = MasterPosition::get();

        return inertia(component: 'MasterHimpunan/Index', props: [
            'himpunan_members_in_this_periode' => HimpunanMemberResource::collection($himpunan_members_in_this_periode),
            'positions' => MasterPositionResource::collection($positions),
        ]);
    }
}
