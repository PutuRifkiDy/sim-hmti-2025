import { IconMasterNotFound } from '@/Components/IconAdmin';

export default function AgendaKhusus(agenda_khusus) {
	return (
		<>
			<div>
				{agenda_khusus.agenda_khusus ? (
					<iframe
						className="flex h-screen w-full items-center"
						src={agenda_khusus.agenda_khusus ?? `${agenda_khusus.agenda_khusus}`}
						allow="autoplay"
					></iframe>
				) : (
					<div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2 md:flex-row">
						<IconMasterNotFound width={80} height={80} />
						<p className="text-center text-[18px] text-[#7F7F7F]">File tidak ditemukan</p>
					</div>
				)}
			</div>
		</>
	);
}
