import { IconMasterNotFound } from '@/Components/IconAdmin';

export default function AnggaranRumahTangga(anggaran_rumah_tangga) {
	return (
		<>
			<div>
				{anggaran_rumah_tangga.anggaran_rumah_tangga ? (
					<iframe
						className="flex h-screen w-full items-center"
						src={
							anggaran_rumah_tangga.anggaran_rumah_tangga ??
							`${anggaran_rumah_tangga.anggaran_rumah_tangga}`
						}
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
