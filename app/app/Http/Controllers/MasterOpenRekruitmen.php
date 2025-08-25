<?php
namespace App\Http\Controllers;

use App\Models\Oprec;
use Carbon\Carbon;
use Inertia\Response;
use App\Traits\HasFile;
use App\Models\OprecSie;
use App\Models\MasterSie;
use App\Models\OprecRegist;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\OprecSieResource;
use App\Http\Resources\MasterSieResource;
use App\Http\Resources\OprecRegisResource;
use App\Http\Requests\MasterOpenRekruitmenRequest;
use App\Http\Resources\MasterOpenRekruitmenResource;

class MasterOpenRekruitmen extends Controller
{
    use HasFile;

    public function index(): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $oprecs = Oprec::orderBy("created_at", "desc")->get();
        $date_now = Carbon::now()->format('Y-m-d H:i:s');
        $total_oprec = $oprecs->count();

        $total_registered = [];
        foreach ($oprecs as $oprec) {
            $total_registered[$oprec->id] = OprecRegist::where('oprec_id', $oprec->id)->count();
        }

        // dd($total_registered);

        return inertia(component: 'MasterOpenRekruitmen/Index', props: [
            'oprecs' => MasterOpenRekruitmenResource::collection($oprecs),
            'total_oprec' => $total_oprec,
            'total_registered' => $total_registered,
            'date_now' => $date_now,
        ]);
    }

    public function create(): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $master_sies = MasterSie::get();

        return inertia(component: 'MasterOpenRekruitmen/Create', props: [
            'master_sies' => MasterSieResource::collection($master_sies),
        ]);
    }

    public function store(MasterOpenRekruitmenRequest $request): RedirectResponse
    {
        $oprec = Oprec::create([
            'oprec_name'  => $request->oprec_name,
            'description' => $request->description,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
            'poster_path' => $request->hasFile('poster_path') ? $this->upload_file($request, 'poster_path', 'oprec') : null,
            'postmsg'     => $request->postmsg,
        ]);

        foreach ($request->sie_id as $key => $value) {
            $oprecsie           = new OprecSie();
            $oprecsie->sie_id   = $value;
            $oprecsie->oprec_id = $oprec->id;
            $oprecsie->save();
        }

        flashMessage('Open Recruitmen berhasil ditambahkan', 'success');
        return to_route('master-open-rekruitmen.index');
    }

    public function edit($id): Response | RedirectResponse
    {
        $user = auth()->user();

        if (! $user) {
            return to_route('login');
        }

        $oprec       = Oprec::find($id);
        $sies        = OprecSie::where('oprec_id', $id)->with('master_sie', 'oprec')->get();
        $master_sies = MasterSie::get();

        return inertia(component: 'MasterOpenRekruitmen/Edit', props: [
            'oprec'       => fn()       => new MasterOpenRekruitmenResource($oprec),
            'sies'        => OprecSieResource::collection($sies),
            'master_sies' => MasterSieResource::collection($master_sies),
        ]);
    }

    public function update(MasterOpenRekruitmenRequest $request, $id): RedirectResponse
    {

        $oprec = Oprec::find($id);
        $oprec->update([
            'oprec_name'  => $request->oprec_name,
            'description' => $request->description,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
            'postmsg'     => $request->postmsg,
            'poster_path' => $request->hasFile('poster_path') ? $this->upload_file($request, 'poster_path', 'oprec') : $oprec->poster_path,
        ]);
        foreach ($request->sie_id as $key => $value) {
            $oprecsie           = new OprecSie();
            OprecSie::where('oprec_id', $id)->whereNotIn('sie_id', $request->sie_id)->delete();


            $oprecsie->updateOrCreate([
                'sie_id' => $value,
                'oprec_id' => $oprec->id,
            ]);
        }

        flashMessage('Open Recruitmen berhasil diupdate', 'success');
        return to_route('master-open-rekruitmen.index');
    }

    public function destroy($id): RedirectResponse
    {
        $oprec = Oprec::find($id);
        $this->delete_file($oprec, 'poster_path');

        $oprec->delete();
        flashMessage('Open Recruitmen berhasil dihapus', 'success');
        return to_route('master-open-rekruitmen.index');
    }

    public function seeRegistered($id): Response | RedirectResponse
    {
        $user = auth()->user();
        if (! $user) {
            return to_route('login');
        }

        $oprec_registered = OprecRegist::with('user', 'master_sie', 'oprec')
            ->where('oprec_id', $id)
            ->get();
        $oprec = Oprec::find($id);

        return inertia(component: 'MasterOpenRekruitmen/SeeRegistered', props: [
            'oprec_registered' => OprecRegisResource::collection($oprec_registered),
            'oprec' => new MasterOpenRekruitmenResource($oprec),
        ]);
    }
}
