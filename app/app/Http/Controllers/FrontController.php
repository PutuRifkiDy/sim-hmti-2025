<?php
namespace App\Http\Controllers;

use App\Http\Resources\HimpunanMemberResource;
use App\Http\Resources\MasterOpenRekruitmenResource;
use App\Http\Resources\MasterPeriodResource;
use App\Http\Resources\MasterProgramKerjaResource;
use App\Models\Himpunan;
use App\Models\MasterPeriod;
use App\Models\MasterPosition;
use App\Models\MasterProgramKerja;
use App\Models\Oprec;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Storage;

class FrontController extends Controller
{
    public function welcome(): Response|RedirectResponse
    {
        $periode_active = MasterPeriod::with('program_kerjas')
            ->where('start_date', '<=', Carbon::now())
            ->where('end_date', '>=', Carbon::now())
            ->first();

        if (!$periode_active) {
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


        if ($periode_active) {
            $program_kerja = $periode_active->program_kerjas()
                ->limit(4)
                ->get();

            $fungsionaris_position = MasterPosition::where('title', 'like', '%anggota%')->get();
            $fungsionaris = $periode_active->himpunans()
                ->whereNotIn('position_id', $fungsionaris_position->pluck('id'))
                ->get();

        } else {
            $program_kerja = collect();
            $fungsionaris = collect();
        }

        $oprecs = Oprec::with('oprec_sies')
            ->orderBy("created_at", "desc")
            ->get()
            ->take(10);

        $date_now = Carbon::now()->format('Y-m-d H:i:s');

        return inertia(component: 'Welcome', props: [
            'periode_active' => fn() => $periode_active ? new MasterPeriodResource($periode_active) : null,
            'program_kerja' => MasterProgramKerjaResource::collection($program_kerja),
            'fungsionaris' => HimpunanMemberResource::collection($fungsionaris),
            'oprecs' => MasterOpenRekruitmenResource::collection($oprecs),
            'date_now' => $date_now,
        ]);
    }

    public function programKerja(): Response|RedirectResponse
    {
        $periodActive = MasterPeriod::with('program_kerjas')
            ->where('start_date', '<=', Carbon::now())
            ->where('end_date', '>=', Carbon::now())
            ->first();

        $data_periods = MasterPeriod::orderBy('created_at', 'desc')->get();

        $requestPeriodInFrontend = request('period_id');

        if ($requestPeriodInFrontend) {
            $periodActive = MasterPeriod::find($requestPeriodInFrontend);

            if (!$periodActive) {
                flashMessage('Tidak ada periode himpunan yang ditemukan', 'error');
                return back();
            }
        } else if (!$periodActive) {
            $periodActive = MasterPeriod::with('program_kerjas')
                ->where('end_date', '<', Carbon::now())
                ->orderBy('end_date', 'desc')
                ->first();
        } else {
            $periodActive = MasterPeriod::with('program_kerjas')
                ->where('start_date', '<=', Carbon::now())
                ->where('end_date', '>=', Carbon::now())
                ->first();
        }

        if ($periodActive) {
            $program_kerja_active = MasterProgramKerja::where('period_id', $periodActive->id)
                ->get();
        } else {
            $program_kerja_active = collect();
        }

        return inertia(component: 'ProgramKerja', props: [
            'data_periods' => MasterPeriodResource::collection($data_periods),
            'periodActive' => fn() => $periodActive ? new MasterPeriodResource($periodActive) : null,
            'program_kerja_active' => MasterProgramKerjaResource::collection($program_kerja_active),
        ]);
    }

    public function fungsionaris(): Response|RedirectResponse
    {
        $periods = MasterPeriod::orderBy('start_date', 'desc')
            ->get(['id', 'title']);

        $reqId = request('period_id');
        $periodActive = $reqId
            ? MasterPeriod::find($reqId)
            : MasterPeriod::where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();

        if (!$periodActive) {
            $periodActive = MasterPeriod::orderBy('end_date', 'desc')->first();
        }

        if (!$periodActive) {
            return inertia('Fungsionaris', [
                'periods' => [],
                'periodActive' => null,
                'view' => ['inti' => [], 'bidang' => []],
            ]);
        }

        $periodId = $periodActive->id;

        $members = Himpunan::with('user')
            ->where('period_id', $periodId)
            ->get();

        $membersByPos = $members->groupBy('position_id');

        $positions = MasterPosition::all(['id', 'title', 'parent_id']);

        $startsWith = fn($t, $p) => str_starts_with(mb_strtolower($t ?? ''), mb_strtolower($p));
        $strip = fn($t, $p) => trim($startsWith($t, $p) ? mb_substr($t, mb_strlen($p)) : $t);

        $cardFromPos = function ($pos, $fallbackTitle = '-') use ($membersByPos) {
            $list = collect($membersByPos->get($pos->id, collect()));
            $lead = $list->first();
            return [
                'nama' => $lead?->user?->name ?? '-',
                'foto' => $lead?->img_himpunan_path ? Storage::url($lead?->img_himpunan_path) : 'assets/icon/default_image_profile-2.png',
                'jabatan' => $pos->title ?? $fallbackTitle,
            ];
        };

        $cardsFromPositions = fn($posCollection) =>
            $posCollection->map(fn($p) => $cardFromPos($p))->values()->all();

        $childrenOf = fn($parentId) => $positions->where('parent_id', $parentId)->values();

        $ketua = $positions->firstWhere('title', 'Ketua') ?? $positions->firstWhere('parent_id', null);

        if (!$ketua) {
            return inertia('Fungsionaris', [
                'periods' => $periods->map(fn($p) => ['id' => $p->id, 'title' => $p->title]),
                'periodActive' => ['id' => $periodActive->id, 'title' => $periodActive->title],
                'view' => ['inti' => [], 'bidang' => []],
            ]);
        }

        $ketuaChildren = $childrenOf($ketua->id);

        $wakils = $ketuaChildren->filter(fn($p) => $startsWith($p->title, 'Wakil'))->sortBy('title')->values();
        $sekrets = $ketuaChildren->filter(fn($p) => $startsWith($p->title, 'Sekretaris'))->sortBy('title')->values();
        $bends = $ketuaChildren->filter(fn($p) => $startsWith($p->title, 'Bendahara'))->sortBy('title')->values();
        $kabids = $ketuaChildren->filter(fn($p) => $startsWith($p->title, 'Kabid'))->sortBy('title')->values();

        $bidang = $kabids->map(function ($kabid) use ($strip, $childrenOf, $cardFromPos, $membersByPos, $startsWith) {
            $allChildren = $childrenOf($kabid->id);
            $kadivPositions = $allChildren->filter(fn($p) => $startsWith($p->title, 'Kadiv'))->sortBy('title')->values();
            $nonKadivChildren = $allChildren->reject(fn($p) => $startsWith($p->title, 'Kadiv'))->values();

            // --- kalo ada kadivnya ---
            if ($kadivPositions->isNotEmpty()) {
                $kadivCards = $kadivPositions->map(fn($k) => $cardFromPos($k))->values()->all();

                $groups = $kadivPositions->map(function ($k) use ($membersByPos, $childrenOf) {
                    $list = collect($membersByPos->get($k->id, collect()));
                    $lead = $list->first();

                    $anggotaLangsung = $list->slice(1)->map(fn($h) => [
                        'nama' => $h->user?->name ?? '-',
                        'foto' => $h->img_himpunan_path ? Storage::url($h->img_himpunan_path) : 'assets/icon/default_image_profile-2.png',
                        'jabatan' => 'Anggota',
                    ])->values();

                    $childPositions = $childrenOf($k->id);
                    $anggotaChild = $childPositions->flatMap(function ($child) use ($membersByPos) {
                        return collect($membersByPos->get($child->id, collect()))->map(fn($h) => [
                            'nama' => $h->user?->name ?? '-',
                            'foto' => $h->img_himpunan_path ? Storage::url($h->img_himpunan_path) : 'assets/icon/default_image_profile-2.png',
                            'jabatan' => 'Anggota',
                        ]);
                    })->values();

                    return [
                        'label' => mb_strtoupper(trim(mb_substr($k->title, 5))), // hapus "Kadiv "
                        'kadivCard' => [
                            'nama' => $lead?->user?->name ?? $lead?->user?->nim ?? '-',
                            'foto' => $lead?->img_himpunan_path ? Storage::url($lead->img_himpunan_path) : 'assets/icon/default_image_profile-2.png',
                            'jabatan' => $k->title,
                        ],
                        'anggota' => $anggotaLangsung->merge($anggotaChild)->all(),
                    ];
                })->values()->all();

                return [
                    'id' => $kabid->id,
                    'label' => mb_strtoupper(trim($strip($kabid->title, 'Kabid'))),
                    'kabidCard' => $cardFromPos($kabid),
                    'kadivCards' => $kadivCards,
                    'groups' => $groups,
                ];
            }

            // --- pas tidak ada kadiv ---
            $listKabid = collect($membersByPos->get($kabid->id, collect()));
            $leadKabid = $listKabid->first();
            $anggotaKabidLangsung = $listKabid->slice(1)->map(fn($h) => [
                'nama' => $h->user?->name ?? '-',
                'foto' => $h->img_himpunan_path ? Storage::url($h->img_himpunan_path) : 'assets/icon/default_image_profile-2.png',
                'jabatan' => 'Anggota',
            ])->values();

            $anggotaDariChild = $nonKadivChildren->flatMap(function ($child) use ($membersByPos) {
                return collect($membersByPos->get($child->id, collect()))->map(fn($h) => [
                    'nama' => $h->user?->name ?? '-',
                    'foto' => $h->img_himpunan_path ? Storage::url($h->img_himpunan_path) : 'assets/icon/default_image_profile-2.png',
                    'jabatan' => 'Anggota',
                ]);
            })->values();

            $groupTanpaKadiv = [
                [
                    'label' => 'ANGGOTA',
                    'kadivCard' => [
                        'nama' => $leadKabid?->user?->name ?? $leadKabid?->user?->nim ?? '-',
                        'foto' => $leadKabid?->img_himpunan_path ? Storage::url($leadKabid->img_himpunan_path) : 'assets/icon/default_image_profile-2.png',
                        'jabatan' => $kabid->title,
                    ],
                    'anggota' => $anggotaKabidLangsung->merge($anggotaDariChild)->all(),
                ]
            ];

            return [
                'id' => $kabid->id,
                'label' => mb_strtoupper(trim($strip($kabid->title, 'Kabid'))),
                'kabidCard' => $cardFromPos($kabid),
                'kadivCards' => [],
                'groups' => $groupTanpaKadiv,
            ];
        })->values()->all();

        // --- INTI ---
        $view = [
            'inti' => [
                'ketua' => $cardFromPos($ketua, 'Ketua'),
                'wakil1' => $wakils->get(0) ? $cardFromPos($wakils[0]) : ['nama' => '-', 'foto' => 'assets/icon/default_image_profile-2.png', 'jabatan' => 'Wakil Ketua 1'],
                'wakil2' => $wakils->get(1) ? $cardFromPos($wakils[1]) : ['nama' => '-', 'foto' => 'assets/icon/default_image_profile-2.png', 'jabatan' => 'Wakil Ketua 2'],
                'sekretariats' => $cardsFromPositions($sekrets),
                'bendaharas' => $cardsFromPositions($bends),
            ],
            'bidang' => $bidang,
        ];

        return inertia('Fungsionaris', [
            'periods' => $periods->map(fn($p) => ['id' => $p->id, 'title' => $p->title]),
            'periodActive' => ['id' => $periodActive->id, 'title' => $periodActive->title],
            'view' => $view,
        ]);
    }
}
