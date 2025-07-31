<?php

namespace App\Http\Controllers;

use App\Http\Requests\MasterPositionRequest;
use App\Http\Resources\MasterPositionResource;
use App\Models\MasterPosition;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class MasterPositionController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        $user_login = auth()->user();
        if (! $user_login) {
            return to_route('login');
        }

        $master_positions = MasterPosition::get();
        $total_position = MasterPosition::count();

        return inertia(component: 'MasterPosition/Index', props: [
            'master_positions' => MasterPositionResource::collection($master_positions),
            'total_position'  => $total_position
        ]);
    }

    public function create(): Response|RedirectResponse
    {
        $user_login = auth()->user();

        if (! $user_login) {
            return to_route('login');
        }

        return inertia(component: 'MasterPosition/Create');
    }

    public function store(MasterPositionRequest $request): RedirectResponse
    {
        $position = MasterPosition::create([
            'title' => $request->title,
        ]);

        flashMessage("Posisi $request->title berhasil ditambahkan", 'success');

        return to_route('master-position.index');
    }

    public function edit($id): Response|RedirectResponse
    {
        $user_login = auth()->user();
        if (! $user_login) {
            return to_route('login');
        }

        $position = MasterPosition::find($id);
        return inertia(component: 'MasterPosition/Edit', props: [
            'position' => fn() => new MasterPositionResource($position),
        ]);
    }

    public function update(MasterPositionRequest $request, $id): RedirectResponse
    {
        $position = MasterPosition::find($id);
        $position->update([
            'title' => $request->title,
        ]);

        flashMessage("Posisi ini berhasil diupdate", 'success');
        return to_route('master-position.index');
    }

    public function destroy($id): RedirectResponse
    {
        $position = MasterPosition::find($id);
        $position->delete();
        flashMessage("Posisi $position->title berhasil dihapus", 'success');
        return to_route('master-position.index');
    }
}
