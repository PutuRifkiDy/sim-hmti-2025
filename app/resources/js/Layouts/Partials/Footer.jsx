import { IconFacebook, IconInstagram, IconTiktok, IconYoutube } from '@/Components/IconGuest';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';

export default function Footer({ ...props }) {
	return (
		<>
			<div className="z-50 hidden md:block">
				<div className="relative w-full">
					<img
						src="/assets/icon/hiasan_left_footer.png"
						alt="Ornament Left"
						className="absolute -top-48 left-0 z-20 h-[192px] w-[193px]"
					/>
					<img
						src="/assets/icon/hiasan_center_footer.png"
						alt="Ornament Left"
						className="absolute -top-24 left-1/2 z-20 h-[134px] w-[762px] -translate-x-1/2"
					/>
					<img
						src="/assets/icon/hiasan_right_footer.png"
						alt="Ornament Left"
						className="absolute -top-48 right-0 z-20 h-[192px] w-[193px]"
					/>
				</div>
				<footer className="z-30 bg-[#071108]">
					<div className="mb-10 flex w-full flex-row justify-between px-12 py-12">
						<div className="flex flex-col gap-5">
							<div>
								<Link href={route('welcome')}>
									<img
										src={`${window.location.origin}/assets/icon/logo_hmti.png`}
										alt=""
										className="h-[80px] w-auto"
									/>
								</Link>
							</div>
							<p className="w-full text-[18px] text-white md:w-[420px]">
								Himpunan Mahasiswa Teknologi Informasi, Fakultas Teknik, Universitas Udayana
							</p>
							<div className="flex flex-row gap-5">
								<a href="https://www.instagram.com/hmtiudayana/" target="_blank">
									<IconInstagram />
								</a>
								<a href="https://www.tiktok.com/@hmtiudayana" target="_blank">
									<IconTiktok />
								</a>
								<a href="https://www.facebook.com/groups/dashboard.it.unud" target="_blank">
									<IconFacebook />
								</a>
								<a href="https://www.youtube.com/@hmtiuniversitasudayana2028" target="_blank">
									<IconYoutube />
								</a>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<h1 className="text-[18px] font-semibold text-white">Quick Links</h1>

							<Link
								// href={route('event.front.show', ['seminar-nasional-teknologi-informasi-of'])}
								href={route('welcome')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Home{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>

							<Link
								href={route('oprec-regist.index')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Open Recruitmen{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>

							<Link
								href={route('fungsionaris')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Struktur Organisasi{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>

							<Link
								href={route('program-kerja')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Program Kerja{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>
						</div>

						<div className="flex flex-col gap-10">
							<div className="flex flex-col gap-5">
								<h1 className="text-[18px] font-semibold text-white">Terkait</h1>
								<a href="https://www.unud.ac.id/" target="_blank" rel="noopener noreferrer">
									<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
										UNUD | Teknologi Informasi
									</p>
								</a>
								<a href="https://it.unud.ac.id/" target="_blank" rel="noopener noreferrer">
									<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
										BEM PM Udayana
									</p>
								</a>
                                <a href="https://smft.unud.ac.id/" target="_blank" rel="noopener noreferrer">
                                    <p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
                                        SMFT UNUD
                                    </p>
                                </a>
							</div>
							<div className="flex flex-col gap-5">
								<h1 className="text-[18px] font-semibold text-white">Bug Report</h1>
								<a href="https://wa.me/62881038194017" target="_blank">
									<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
										+62881038194017
									</p>
								</a>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<h1 className="text-[18px] font-semibold text-white">Alamat</h1>
								<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
									Jl. Kampus Udayana Bukit Jimbaran, Jimbaran, Kuta Selatan, Kabupaten Badung, Bali
									80361
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="text-[18px] font-semibold text-white">No. Telepon</h1>
								<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
									(0361) 701806
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="text-[18px] font-semibold text-white">Email</h1>
								<a href="mailto:hmti@unud.ac.id" target="_blank">
									<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
										hmti@unud.ac.id
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className="flex justify-start bg-[#000000] px-12 py-6">
						<p className="text-white">© 2025 Kabinet Harmoni</p>
					</div>
					{/* <ScrollToTop /> */}
				</footer>
			</div>

			<div className="md:hidden">
				<div className="relative w-full">
					<img
						src="/assets/icon/hiasan_left_footer.png"
						alt="Ornament Left"
						className="absolute -top-12 left-0 h-[47px] w-[47px]"
					/>
					<img
						src="/assets/icon/hiasan_center_footer.png"
						alt="Ornament Left"
						className="absolute -top-9 left-1/2 h-[47px] w-[267px] -translate-x-1/2"
					/>
					<img
						src="/assets/icon/hiasan_right_footer.png"
						alt="Ornament Left"
						className="absolute -top-12 right-0 h-[47px] w-[47px]"
					/>
				</div>
				<footer className="bg-[#071108]">
					<div className="mb-10 flex w-full flex-col gap-10 px-5 py-12">
						<div className="flex flex-col gap-5">
							<div>
								<Link href={route('welcome')}>
									<img
										src={`${window.location.origin}/assets/icon/logo_hmti.png`}
										alt=""
										className="h-[80px] w-auto"
									/>
								</Link>
							</div>
							<p className="w-full text-[18px] text-white md:w-[420px]">
								Himpunan Mahasiswa Teknologi Informasi, Fakultas Teknik, Universitas Udayana
							</p>

							<div className="flex flex-row gap-5">
								<a href="https://www.instagram.com/hmtiudayana/" target="_blank">
									<IconInstagram />
								</a>
								<a href="https://www.tiktok.com/@hmtiudayana" target="_blank">
									<IconTiktok />
								</a>
								<a href="https://www.facebook.com/groups/dashboard.it.unud" target="_blank">
									<IconFacebook />
								</a>
								<a href="https://www.youtube.com/@hmtiuniversitasudayana2028" target="_blank">
									<IconYoutube />
								</a>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<h1 className="text-[18px] font-semibold text-white">Quick Links</h1>

							<Link
								// href={route('event.front.show', ['seminar-nasional-teknologi-informasi-of'])}
								href={route('welcome')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Home{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>

							<Link
								href={route('oprec-regist.index')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Open Recruitmen{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>

							<Link
								href={route('fungsionaris')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Struktur Organisasi{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>

							<Link
								href={route('program-kerja')}
								className="group flex flex-row items-center justify-start gap-2 text-white"
							>
								Program Kerja{' '}
								<ChevronRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-3" />
							</Link>
						</div>

						<div className="flex flex-col gap-10">
							<div className="flex flex-col gap-5">
								<h1 className="text-[18px] font-semibold text-white">Terkait</h1>
								<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
									UNUD | Teknologi Informasi
								</p>
								<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
									BEM PM Udayana
								</p>
								<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">SMFT UNUD</p>
							</div>
						</div>

						<div className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<h1 className="text-[18px] font-semibold text-white">Alamat</h1>
								<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
									Jl. Kampus Udayana Bukit Jimbaran, Jimbaran, Kuta Selatan, Kabupaten Badung, Bali
									80361
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="text-[18px] font-semibold text-white">No. Telepon</h1>
								<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
									(0361) 701806
								</p>
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="text-[18px] font-semibold text-white">Email</h1>
								<a href="mailto:hmti@unud.ac.id" target="_blank">
									<p className="w-full text-[14px] leading-[140%] text-white md:w-[280px]">
										hmti@unud.ac.id
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className="flex justify-start bg-[#000000] px-12 py-6">
						<p className="text-white">© 2025 Kabinet Harmoni</p>
					</div>
					{/* <ScrollToTop /> */}
				</footer>
			</div>

			{/* untuk responsive footernya */}
			{/* <footer className="md:hidden bg-[#0F114C] w-full px-5 py-5 pb-12">
                <div className="flex flex-col gap-10 mb-10">

                    <div className="flex flex-col gap-5">
                        <h1 className="text-white font-semibold text-[24px]">ITCC 2025</h1>
                        <p className="text-[18px] text-white md:w-[420px] w-full">
                            Transcending Boundaries: Realizing a Resilent Future With Human-Centric Interlaced Innovations
                        </p>
                        <div className="flex flex-row gap-5">
                            <a href="">
                                <IconInstagram />
                            </a>
                            <a href="">
                                <IconTiktok />
                            </a>
                            <a href="">
                                <IconFacebook />
                            </a>
                            <a href="">
                                <IconYoutube />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-white font-semibold text-[24px]">Other</h1>

                        <Link
                            className="text-white flex flex-row justify-start items-center gap-2"
                        >
                            Seminar Nasional <ChevronRightIcon className="w-5 h-5" />
                        </Link>
                        <Link
                            className="text-white flex flex-row justify-start items-center gap-2"
                        >
                            Merchandise <ChevronRightIcon className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
                <div className="divider h-[1px] w-auto md:w-full bg-white mb-10"></div>
            </footer> */}
		</>
	);
}
