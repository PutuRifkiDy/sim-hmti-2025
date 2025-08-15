<?php
namespace App\Http\Controllers;

use App\Http\Requests\OprecRegistRequest;
use App\Http\Resources\MasterOpenRekruitmenResource;
use App\Http\Resources\OprecRegisResource;
use App\Http\Resources\OprecSieResource;
use App\Http\Resources\UserSingleResource;
use App\Models\Oprec;
use App\Models\OprecRegist;
use App\Models\OprecSie;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class OprecRegistController extends Controller
{
    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $oprecs = Oprec::with('oprec_sies')
            ->orderBy("created_at", "desc")
            ->get();

        $date_now = Carbon::now()->format('Y-m-d H:i:s');

        return inertia(component: 'OprecRegist/Index', props: [
            'oprecs'   => MasterOpenRekruitmenResource::collection($oprecs),
            'date_now' => $date_now,
        ]);
    }

    public function show($id): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $is_registered = OprecRegist::where('oprec_id', $id)
            ->where('user_id', $user->id)
            ->exists();

        if ($is_registered == true) {
            return to_route('oprec-regist.edit', ['idOprec' => $id, 'idUser' => $user->id]);
        }

        $oprec_is_active = Oprec::where("id", '=', $id)
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->exists();

        if ($oprec_is_active == false) {
            flashMessage("Oprec ini sudah tidak aktif lagi", 'error');
            return back();
        }

        $oprec = Oprec::find($id);

        $sies = OprecSie::with('master_sie')
            ->where('oprec_id', $id)
            ->get();

        return inertia(component: 'OprecRegist/Show', props: [
            'oprec' => new MasterOpenRekruitmenResource($oprec),
            'sies'  => OprecSieResource::collection($sies),
            'user'  => new UserSingleResource($user),
        ]);
    }

    public function store(OprecRegistRequest $request): RedirectResponse
    {

        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        if ($user->already_filled == false) {
            flashMessage('Silahkan lengkapi kembali profil anda sebelum mendaftar', 'error');
            return back();
        }

        $oprec_is_active = Oprec::where("id", '=', $request->oprec_id)
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->exists();

        if ($oprec_is_active == false) {
            flashMessage("Oprec ini sudah tidak aktif lagi", 'error');
            return back();
        }

        $oprec_regist = OprecRegist::create([
            'reason_join' => $request->reason_join,
            'experience'  => $request->experience,
            'sie_id'      => $request->sie_id,
            'oprec_id'    => $request->oprec_id,
            'user_id'     => $request->user_id,
        ]);

        flashMessage("Pendaftaran berhasil disimpan", 'success');
        return to_route('oprec-regist.edit', ['idOprec' => $oprec_regist->oprec_id, 'idUser' => $oprec_regist->user_id]);
    }

    public function registered($idOprec, $idUser): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $oprec_regist = OprecRegist::with('user', 'master_sie', 'oprec')
            ->where('oprec_id', $idOprec)
            ->where('user_id', $idUser)
            ->first();

        return inertia(component: 'OprecRegist/Registered', props: [
            'oprec_regist' => new OprecRegisResource($oprec_regist),
        ]);
    }
}
