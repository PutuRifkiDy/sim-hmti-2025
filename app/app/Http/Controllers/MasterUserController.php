<?php
namespace App\Http\Controllers;

use App\Http\Requests\CreateMahasiswaRequest;
use App\Http\Requests\MasterUserUpdateRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserSingleResource;
use App\Models\User;
use App\Traits\HasFile;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MasterUserController extends Controller
{
    use HasFile;
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $master_users = User::get();

        return inertia(component: 'MasterUser/Index', props: [
            'master_users' => UserSingleResource::collection($master_users),
        ]);
    }

    public function create(): Response
    {
        return inertia(component: 'MasterUser/Create');
    }

    public function store(CreateMahasiswaRequest $request): RedirectResponse
    {
        $angkatan = $request->angkatan;
        $start    = $request->start;
        $end      = $request->end;

        $user         = [];
        $nimsGenerate = [];

        for ($i = $start; $i <= $end; $i++) {
            $nim            = $angkatan . '0555100' . $i;
            $nimsGenerate[] = $nim;
            $user[]         = [
                'nim'        => $nim,
                'password'   => bcrypt($nim),
                'created_at' => Carbon::now()->format('Y-m-d'),
                'updated_at' => Carbon::now()->format('Y-m-d'),
            ];
        }

        $existingNims = User::whereIn('nim', $nimsGenerate)->pluck('nim')->toArray();

        if (count($existingNims)) {
            flashMessage("Nim sudah terdaftar, silahkan input nomer pertama dan akhir yang lain", 'error');
            return back();
        } else {
            User::insert($user);
        }

        flashMessage(count($user) . " mahasiswa berhasil ditambahkan", 'success');
        return to_route('master-user.index');
    }

    public function edit($id): Response
    {
        $users = User::find($id);

        return inertia(component: 'MasterUser/Edit', props: [
            'users' => fn() => new UserSingleResource($users),
        ]);
    }

    public function update(MasterUserUpdateRequest $request, $id): RedirectResponse
    {
        $user = User::find($id);
        $user->update([
            'name'         => $request->name,
            'email'        => $request->email,
            'nim'          => $request->nim,
            'line_id'      => $request->line_id,
            'phone_number' => $request->phone_number,
            'birthday'     => $request->birthday,
            'address'      => $request->address,
            'username'     => $request->username,
            'img_path'     => $request->hasFile('img_path') ? $this->upload_file($request, 'img_path', 'user/foto_profile') : $user->img_path,
        ]);

        flashMessage('Mahasiswa berhasil diupdate', 'success');

        return to_route('master-user.index');
    }

    public function destroy($id): RedirectResponse
    {
        $user = User::find($id);
        $this->delete_file($user, 'img_path');
        $user->delete();
        flashMessage('Mahasiswa berhasil dihapus', 'success');
        return to_route('master-user.index')->with('inertia_reload', true);
    }

}
