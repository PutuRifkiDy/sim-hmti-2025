<?php
namespace App\Http\Controllers;

use Inertia\Response;
use App\Models\MasterSie;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\MasterSieRequest;
use App\Http\Resources\MasterSieResource;

class MasterSieController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $master_sies = MasterSie::get();
        $total_sie   = MasterSie::count();

        return inertia(component: 'MasterSie/Index', props: [
            'master_sies' => MasterSieResource::collection($master_sies),
            'total_sie'   => $total_sie,
        ]);
    }

    public function create(): Response
    {
        return inertia(component: 'MasterSie/Create');
    }

    public function store(MasterSieRequest $request): RedirectResponse
    {
        MasterSie::create([
            'sie_name' => $request->sie_name,
        ]);

        flashMessage("Sie $request->sie_name berhasil ditambahkan", 'success');

        return to_route('master-sie.index');
    }

    public function edit($id): Response
    {
        $sie = MasterSie::find($id);

        return inertia(component: 'MasterSie/Edit', props: [
            'sie' => fn() => new MasterSieResource($sie),
        ]);
    }

    public function update(MasterSieRequest $request, $id): RedirectResponse
    {
        $sie = MasterSie::find($id);
        $sie->update([
            'sie_name' => $request->sie_name,
        ]);

        flashMessage("Sie ini berhasil diupdate", 'success');

        return to_route('master-sie.index');
    }

    public function destroy($id): RedirectResponse
    {
        $sie = MasterSie::find($id);
        $sie->delete();

        flashMessage("Sie $sie->sie_name berhasil dihapus", "success");
        return to_route('master-sie.index');
    }
}
