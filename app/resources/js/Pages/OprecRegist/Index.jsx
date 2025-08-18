import { Button } from '@/Components/ui/button';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Index() {
	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);
	const oprecs = usePage().props.oprecs;
	const dateNow = usePage().props.date_now;
	console.log('ini adalah dateNow', dateNow);
	console.log('ini adalah oprecs', oprecs);

	const templateDateTime = (date) => {
		const options = { year: 'numeric', month: 'short', day: '2-digit' };
		const formatDate = new Date(date).toLocaleDateString('id-ID', options);
		return formatDate;
	};

	const isOprecActive = (startDate, endDate) => {
		if (dateNow >= startDate && dateNow <= endDate) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{oprecs?.map((oprec, index) => (
					<Link href={route('oprec-regist.show', oprec.id)} key={index} className="">
						<div
							className={`flex h-full w-full flex-col justify-between rounded-[20px] border-2 border-[#ECBB4E] bg-white p-4 dark:bg-[#1F1F1F] sm:w-full lg:w-full xl:w-full ${isOprecActive(oprec.start_date, oprec.end_date) == false ? 'opacity-50' : ''}`}
						>
							<div className="flex h-full w-full items-center overflow-hidden rounded-[10px] sm:w-full lg:w-full xl:w-full">
								<img
									src={oprec.poster_path}
									className="h-full w-full transform transition-all duration-300 ease-in-out hover:scale-105 sm:w-full lg:w-full xl:w-full"
									alt=""
								/>
							</div>
							<div className="mt-3 flex flex-col items-center justify-between gap-2 md:flex-row">
								<div className="flex flex-col">
									<p className="line-clamp-1 text-[20px] font-semibold leading-[110%] text-[#1F1F1F] dark:text-white">
										{oprec.oprec_name}
									</p>
									<p className="text-[13px] leading-[110%] text-[#1F1F1F] dark:text-white">
										<span>{templateDateTime(oprec.start_date)}</span> {' - '}
										<span>{templateDateTime(oprec.end_date)}</span>
									</p>
								</div>
								<Button
									variant="none"
									className="rounded-[10px] bg-[#ECBB4E] shadow-[0_0_15px_#ECBB4E]"
								>
									<Link
										href={route('oprec-regist.show', oprec.id)}
										className="flex flex-row items-center gap-1 px-2 text-[14px] font-bold text-white group"
									>
										Join
										<ArrowRightIcon className="inline-block h-4 w-4 transition-transform transform duration-300 group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
}

Index.layout = (page) => (
	<DashboardLayout
		children={page}
		title={'Open Recruitmen'}
		header={'Open Recruitmen'}
		description={'Daftar kegiatan himpunan di page ini'}
	/>
);
