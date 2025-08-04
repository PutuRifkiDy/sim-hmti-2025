<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Response;
use App\Traits\HasFile;
use App\Models\Himpunan;
use App\Models\MasterPeriod;
use App\Models\MasterPosition;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\UserSingleResource;
use App\Http\Requests\HimpunanUpdateRequest;
use App\Http\Requests\MasterHimpunanRequest;
use App\Http\Resources\MasterPeriodResource;
use App\Http\Resources\HimpunanMemberResource;
use App\Http\Resources\MasterPositionResource;

class MasterHimpunanController extends Controller
{
    use HasFile;
    public function index($id): Response | RedirectResponse
    {
        $user_login = auth()->user();
        if (! $user_login) {
            return to_route('login');
        }

        $periode                          = MasterPeriod::find($id);
        $himpunan_members_in_this_periode = Himpunan::where('period_id', $id)->with('user', 'position', 'period')->get();
        $positions                        = MasterPosition::get();

        return inertia(component: 'MasterHimpunan/Index', props: [
            'himpunan_members_in_this_periode' => HimpunanMemberResource::collection($himpunan_members_in_this_periode),
            'positions'                        => MasterPositionResource::collection($positions),
            'periode'                          => fn()                          => new MasterPeriodResource($periode),
        ]);
    }

    public function create($idPeriode): Response
    {
        $users            = User::get();
        $master_positions = MasterPosition::get();
        $periode          = MasterPeriod::find($idPeriode);
        return inertia(component: 'MasterHimpunan/Create', props: [
            'users'            => UserSingleResource::collection($users),
            'master_positions' => MasterPositionResource::collection($master_positions),
            'periode'          => fn()          => new MasterPeriodResource($periode),
        ]);
    }

    public function store(MasterHimpunanRequest $request, $id): RedirectResponse
    {
        $position = MasterPosition::find($request->position_id);
        if (! $position) {
            flashMessage('Posisi tidak ditemukan', 'error');
            return back();
        }

        if (! str_contains(strtolower($position->title), 'anggota') && count($request->user_id) > 1) {
            flashMessage("Posisi $position->title hanya bisa memiliki 1 anggota", 'error');
            return back();
        }

        foreach ($request->user_id as $key => $value) {
            $exist = Himpunan::where('user_id', $value)
                ->where('period_id', $id)
                ->exists();

            $user_nim = User::find($value);

            if ($exist) {
                flashMessage("User dengan NIM $user_nim->nim sudah menjabat di periode ini ", 'error');
                return back();
            }
        }

        foreach ($request->user_id as $key => $value) {
            $himpunan              = new Himpunan();
            $himpunan->user_id     = $value;
            $himpunan->position_id = $request->position_id;
            $himpunan->period_id   = $id;
            $himpunan->save();
        }

        flashMessage('Beberapa Fungsionaris berhasil ditambahkan', 'success');
        return to_route('master-himpunan.index', ['id' => $id]);
    }

    public function edit($id): Response
    {
        $himpunan  = Himpunan::find($id);
        $positions = MasterPosition::get();
        $users     = User::get();

        return inertia(component: 'MasterHimpunan/Edit', props: [
            'himpunan'  => fn()  => new HimpunanMemberResource($himpunan),
            'positions' => MasterPositionResource::collection($positions),
            'users'     => UserSingleResource::collection($users),
        ]);
    }

    public function update(HimpunanUpdateRequest $request, $id): RedirectResponse
    {
        $himpunan = Himpunan::find($id);
        $himpunan->update([
            'user_id'           => $request->user_id,
            'position_id'       => $request->position_id,
            'img_himpunan_path' => $request->hasFile('img_himpunan_path') ? $this->upload_file($request, 'img_himpunan_path', 'himpunan') : $himpunan->img_himpunan_path,
        ]);

        flashMessage("Fungsionaris ini berhasil di update", 'success');
        return to_route('master-himpunan.index', ['id' => $himpunan->period_id]);
    }

    public function destroy($id): RedirectResponse
    {
        $himpunan = Himpunan::find($id);
        $himpunan->delete();
        flashMessage('Himpunan berhasil dihapus', 'success');
        return to_route('master-himpunan.index', ['id' => $himpunan->period_id]);
    }
}
