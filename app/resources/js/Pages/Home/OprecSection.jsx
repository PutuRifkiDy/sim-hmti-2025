import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/Components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function OprecSection({ oprecs, dateNow }) {
	useEffect(() => {
		AOS.init({
			duration: 800,
			once: false,
			easing: 'ease-out-cubic',
			offset: 100,
			delay: 0,
			mirror: false,
			anchorPlacement: 'top-bottom',
		});

		setTimeout(() => {
			AOS.refreshHard();
		}, 500);
	}, []);
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
			<div className="z-10 flex w-full flex-col items-center bg-white px-5 py-[16px] pb-36 dark:bg-[#1f1f1f] md:px-6">
				<div className="header-oprec mb-[32px] flex w-[95%] flex-col items-center justify-between md:flex-row md:items-end">
					<div className="inner-header-oprec flex flex-col items-center md:items-start">
						<h1
							data-aos="fade-up"
							data-aos-duration="600"
							className="font-poppins text-center text-[30px] font-black text-[#ECC067] md:text-start"
						>
							OPEN RECRUITMENT
						</h1>
						<p data-aos="fade-up" data-aos-duration="1200" className="text-center md:text-start">
							Ayo daftarkan dirimu dalam kegiatan-kegiatan HMTI, kami tunggu kontribusi kalian!
						</p>
					</div>
					<Link
						data-aos="fade-up"
						data-aos-duration="1200"
						href={route('oprec-regist.index')}
						className="group mt-[20px] flex h-fit items-center md:mt-[0px]"
					>
						Lihat Semua
						<ArrowRightIcon className="ml-[12px] h-[20px] w-[20px] transform transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</div>
				<div className="slider-oprec w-[95%]">
					<Swiper
						modules={[FreeMode, Autoplay, Navigation, Pagination]}
						spaceBetween={20}
						freeMode={true}
						// autoplay={{ delay: 3000, disableOnInteraction: false }}
						grabCursor={true}
						breakpoints={{
							0: {
								slidesPerView: 1,
							},
							600: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
							},
							1440: {
								slidesPerView: 4,
							},
						}}
						className="h-full"
						data-aos="fade-up"
						data-aos-duration="1200"
					>
						{oprecs.map((oprec, index) => (
							<SwiperSlide key={index}>
								<Link href={route('oprec-regist.show', oprec.id)}>
									<div
										className={`flex h-[500px] w-full flex-col justify-between rounded-[20px] border-2 border-[#ECBB4E] bg-white p-4 dark:bg-[#1F1F1F] sm:w-full lg:w-full xl:w-full ${isOprecActive(oprec.start_date, oprec.end_date) == false ? 'opacity-50' : ''}`}
									>
										<div className="flex h-full w-full items-center overflow-hidden rounded-[10px] sm:w-full lg:w-full xl:w-full">
											<img
												src={oprec?.poster_path}
												className="h-full w-full transform transition-all duration-300 ease-in-out hover:scale-105 sm:w-full lg:w-full xl:w-full"
												alt=""
											/>
										</div>
										<div className="area-header-pamflet mt-[8px] flex w-full items-end justify-between">
											<div className="header-pamflet flex flex-col">
												<h1 className="my-[8px] line-clamp-1 h-fit text-[20px] font-semibold leading-[100%]">
													{oprec?.oprec_name}
												</h1>
												<p className="mb-[8px] text-[12px] leading-[100%]">
													{templateDateTime(oprec?.start_date)} -{' '}
													{templateDateTime(oprec?.end_date)}
												</p>
											</div>
											<Button
												variant="gold"
												type="button"
												asChild
												className="shadow-[0_0_15px_#ECBB4E]"
											>
												<Link
													href={route('oprec-regist.show', oprec.id)}
													className="group flex flex-row items-center gap-1 px-2 text-[14px] font-bold text-white"
												>
													Join
													<ArrowRightIcon className="inline-block h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
												</Link>
											</Button>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
}
