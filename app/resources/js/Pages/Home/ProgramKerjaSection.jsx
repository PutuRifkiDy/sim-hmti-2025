import { Button } from '@/Components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function ProgramKerjaSection({ program_kerja }) {
	const [hoveredCard, setHoveredCard] = useState(null);

	const handleMouseEnter = (card) => {
		setHoveredCard(card);
	};

	const handleMouseLeave = () => {
		setHoveredCard(null);
	};

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

	return (
		<>
			<section className="relative flex w-full items-center justify-center bg-white px-4 py-16 dark:bg-[#1f1f1f] sm:px-8">
				{/* <img src="/assets/icon/hiasan_left_footer.png" alt="Ornament" className="absolute top-0 left-0 h-24 sm:h-32 md:h-48 z-10 transform rotate-90" />
                <img src="/assets/icon/hiasan_right_footer.png" alt="Ornament" className="absolute top-0 right-0 h-24 sm:h-32 md:h-48 z-10 transform -rotate-90" /> */}
				<img
					src="/assets/icon/hiasan_left_footer.png"
					alt="Ornament"
					className="pointer-events-none absolute left-0 top-0 z-10 h-24 rotate-90 select-none sm:h-32 md:h-48"
				/>
				<img
					src="/assets/icon/hiasan_right_footer.png"
					alt="Ornament"
					className="pointer-events-none absolute right-0 top-0 z-10 h-24 -rotate-90 select-none sm:h-32 md:h-48"
				/>
				<div className="z-20 mx-auto flex w-full max-w-5xl flex-col items-center">
					<div className="mb-10 text-center">
						<div className="relative inline-block">
							<span
								className="relative z-10 block text-5xl font-normal text-[#785233] sm:text-8xl"
								data-aos="fade-up"
								data-aos-duration="600"
								style={{ fontFamily: 'Arrintika Signature, cursive' }}
							>
								Program
							</span>
							<h1
								data-aos="fade-up"
								data-aos-duration="1000"
								className="font-poppins mt-[-1.5rem] pb-0 text-5xl font-black tracking-tighter text-[#ECC067] sm:mt-[-3rem] sm:text-8xl"
							>
								KERJA
							</h1>
						</div>
						<p data-aos="fade-up" data-aos-duration="1400" className="mt-1 text-black dark:text-white">
							Daftar Program Kerja dalam naungan Himpunan Mahasiswa Teknologi Informasi
						</p>
					</div>

					<div
						className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12"
						data-aos="fade-up"
						data-aos-duration="1800"
					>
						{program_kerja?.map((kerja, index) => (
							<div
								className={`group relative mx-auto aspect-[414/233] w-full max-w-[414px] cursor-pointer overflow-hidden rounded-lg border-2 border-[#E4B45C] shadow-md transition-all duration-500 ease-in-out hover:-translate-y-2`}
								onMouseEnter={() => handleMouseEnter(kerja)}
								onMouseLeave={handleMouseLeave}
								key={index}
							>
								<div
									className="absolute inset-0 bg-cover bg-center"
									style={{ backgroundImage: `url('${kerja.img_path}')` }}
								/>
								<div
									className={`absolute inset-0 flex items-end p-4 transition-opacity duration-300 ${
										hoveredCard == kerja ? 'opacity-0' : 'md:group-hover:opacity-0'
									}`}
									style={{
										background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))',
									}}
								>
									<h3 className="w-full text-center text-base font-bold tracking-wide text-white sm:text-lg md:text-xl">
										{kerja?.title}
									</h3>
								</div>
								<div
									className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 px-4 text-center transition-opacity duration-300 ${
										hoveredCard == kerja ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
									}`}
								>
									<h3 className="mb-2 text-base font-bold text-white sm:text-lg md:text-xl">
										{kerja?.title}
									</h3>
									<p className="text-xs leading-relaxed text-white sm:text-sm md:text-base">
										{kerja?.description}
									</p>
								</div>
							</div>
						))}
						{/* <div className="group relative bg-[#ECC067] p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300" key={index}>
                            <div className="overflow-hidden rounded-lg">
                                <img src={kerja.img_path} alt={kerja.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="m-1 absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                                <h3 className="text-white text-2xl font-bold mb-4">{kerja.title}</h3>
                            </div>
                        </div> */}
					</div>

					<div className="mt-10 text-center md:mt-32">
						<Button
							data-aos="fade-up"
							data-aos-duration="600"
							variant="gold"
							type="button"
							asChild
							className="animate-bounce px-16 py-5 shadow-[0_0_15px_#ECBB4E] transition-all duration-1000 ease-in-out"
						>
							<Link className="group" href={route('program-kerja')}>
								Lihat Semua Program Kerja
								<ArrowRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-2" />
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
