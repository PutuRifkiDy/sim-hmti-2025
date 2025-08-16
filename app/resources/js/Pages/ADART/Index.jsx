import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import AgendaKhusus from './Partials/AgendaKhusus';
import AnggaranDasar from './Partials/AnggaranDasar';
import AnggaranRumahTangga from './Partials/AnggaranRumahTangga';

export default function Index() {
	const ad_art = usePage().props.ad_art;
	const [tabActive, setTabActive] = useState(0);

	console.log(ad_art);
	return (
		<>
			<div className="py-5">
				<div className="flex flex-col justify-between gap-5 space-y-2 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="flex-cl flex gap-10 md:flex-row">
						<div
							className={`relative cursor-pointer ${tabActive == 0 ? 'text-[#ECBB4E]' : ''} `}
							onClick={() => setTabActive(0)}
						>
							<p className="text-center md:text-start">Anggaran Dasar</p>
							{tabActive == 0 && (
								<span className="rounded-top-md absolute h-1.5 w-full rounded-t-md bg-[#ECBB4E]"></span>
							)}
						</div>
						<div
							className={`relative cursor-pointer ${tabActive == 1 ? 'text-[#ECBB4E]' : ''} `}
							onClick={() => setTabActive(1)}
						>
							<p className="text-center md:text-start">Anggaran Rumah Tangga</p>
							{tabActive == 1 && (
								<span className="rounded-top-md absolute h-1.5 w-full rounded-t-md bg-[#ECBB4E]"></span>
							)}{' '}
						</div>
						<div
							className={`relative cursor-pointer ${tabActive == 2 ? 'text-[#ECBB4E]' : ''} `}
							onClick={() => setTabActive(2)}
						>
							<p className="text-center md:text-start">Agenda Khusus</p>
							{tabActive == 2 && (
								<span className="rounded-top-md absolute h-1.5 w-full rounded-t-md bg-[#ECBB4E]"></span>
							)}
						</div>
					</div>

					{tabActive == 0 && <AnggaranDasar anggaran_dasar={ad_art.anggaran_dasar} />}

					{tabActive == 1 && <AnggaranRumahTangga anggaran_rumah_tangga={ad_art.anggaran_rumah_tangga} />}

					{tabActive == 2 && <AgendaKhusus agenda_khusus={ad_art.agenda_khusus} />}
				</div>
			</div>
		</>
	);
}

Index.layout = (page) => (
	<DashboardLayout children={page} title={'ADART'} header={'ADART'} description={'Lihat ADART di periode ini'} />
);
