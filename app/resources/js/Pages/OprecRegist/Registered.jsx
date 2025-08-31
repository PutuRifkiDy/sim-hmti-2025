import InputLabel from '@/Components/InputLabel';
import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeftIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';

export default function Registered() {
	const oprec_regist = usePage().props.oprec_regist;
	const cleanDescription = DOMPurify.sanitize(oprec_regist.oprec.description);
	const cleanReasonJoin = DOMPurify.sanitize(oprec_regist.reason_join);
	const cleanExperience = DOMPurify.sanitize(oprec_regist.experience);
	return (
		<>
			<div className="py-5">
				<div className="mb-5 flex w-full items-center gap-2 border-l-4 border-l-[#00D238] bg-[#00D238]/20 px-4 py-2 dark:border-l-[#55b1d7] dark:bg-[#55b1d7]/20">
					<CheckBadgeIcon className="h-6 w-6 shrink-0 text-[#00D238] dark:text-white" />
					<p className="text-[14px] font-medium leading-[16px] text-[#00D238] dark:text-white">
						Anda telah terdaftar pada kegiatan ini. Silahkan tunggu undangan dari panitia untuk mengikuti
						kegiatan ini.
					</p>
				</div>
				<div className="mb-5 flex w-full flex-row">
					<Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
						<Link
							as="button"
							href={route('oprec-regist.index')}
							className="group flex flex-row items-center text-[14px] font-bold gap-1"
						>
							<ArrowLeftIcon className="h-3 w-3 font-bold transform transition-transform duration-300 group-hover:-translate-x-1" />
							Kembali
						</Link>
					</Button>
				</div>
				<div className="flex flex-col justify-between gap-5 rounded-lg bg-white p-4 shadow dark:bg-[#1F1F1F] sm:p-8">
					<div className="mb-5 flex flex-col gap-2 leading-[110%]">
						<p className="text-[30px] font-bold text-[#000000] dark:text-white">
							{oprec_regist?.oprec.oprec_name}
						</p>
						<p className="text-[15px] leading-[110%] text-[#7F7F7F]">Informasi open recruitmen</p>
					</div>

					<div className="flex w-[100%] flex-col gap-10 md:flex-row">
						<div className="w-[40%]">
							<img src={oprec_regist.oprec.poster_path} alt="Poster Oprec" className="h-auto w-full" />
						</div>
						<div dangerouslySetInnerHTML={{ __html: cleanDescription }} className="w-[60%]" />
					</div>

					<div className="mt-10 flex w-full flex-row justify-between">
						<header>
							<h2 className="text-lg font-medium text-gray-900 dark:text-white">
								Anda telah terdaftar pada kegiatan ini
							</h2>

							<p className="mt-1 text-sm text-gray-600">
								Silahkan tunggu undangan dari panitia untuk mengikuti kegiatan ini ✅
							</p>
						</header>
					</div>

					<div className="mb-5 mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
						<div>
							<InputLabel
								htmlFor="nim"
								value="NIM"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{oprec_regist.user.nim ? oprec_regist.user.nim : '-'}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="name"
								value="Nama"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{oprec_regist.user.name ? oprec_regist.user.name : '-'}</p>
						</div>
						<div>
							<InputLabel
								htmlFor="phone_number"
								value="Nomor Telepon"
								className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
							/>
							<p>{oprec_regist.user.phone_number ? oprec_regist.user.phone_number : '-'}</p>
						</div>
					</div>
					<div>
						<InputLabel
							htmlFor="experience"
							value="Pengalaman"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<div dangerouslySetInnerHTML={{ __html: cleanExperience }} className="w-[60%]" />
					</div>
					<div>
						<InputLabel
							htmlFor="reason_join"
							value="Alasan Bergabung"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<div dangerouslySetInnerHTML={{ __html: cleanReasonJoin }} className="w-[60%]" />
					</div>
					<div>
						<InputLabel
							htmlFor="postmsg"
							value="Pesan"
							className="text-[12px] font-normal text-[#676767] dark:text-gray-400"
						/>
						<p>{oprec_regist.oprec.postmsg ? oprec_regist.oprec.postmsg : '-'}</p>
					</div>
				</div>
			</div>
		</>
	);
}

Registered.layout = (page) => (
	<DashboardLayout
		children={page}
		title={'Registrasi Open Recruitment'}
		header={'Registrasi Open Recruitment'}
		description={'Daftar kegiatan di page ini'}
	/>
);
