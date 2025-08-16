import { IconFacebook, IconInstagram, IconTiktok, IconYoutube } from "@/Components/IconGuest";
import { Link, usePage } from "@inertiajs/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Footer({ ...props }) {
    return (
        <>
            <div className="md:block hidden">
                <div className="relative w-full">
                    <img src="/assets/icon/hiasan_left_footer.png" alt="Ornament Left" className="absolute left-0 -top-48 w-[193px] h-[192px]" />
                    <img src="/assets/icon/hiasan_center_footer.png" alt="Ornament Left" className="absolute left-1/2 -translate-x-1/2 -top-24 w-[762px] h-[134px]" />
                    <img src="/assets/icon/hiasan_right_footer.png" alt="Ornament Left" className="absolute right-0 -top-48 w-[193px] h-[192px]" />
                </div>
                <footer className="bg-[#071108] ">
                    <div className="flex flex-row justify-between mb-10 w-full px-12 py-12">

                        <div className="flex flex-col gap-5">
                            <div>
                                <Link
                                    href={route('welcome')}
                                >
                                    <img src={`${window.location.origin}/assets/icon/logo_hmti.png`} alt="" className="w-auto h-[80px]" />
                                </Link>
                            </div>
                            <p className="text-[18px] text-white md:w-[420px] w-full">
                                Himpunan Mahasiswa Teknologi Informasi, Fakultas Teknik, Universitas Udayana
                            </p>
                            <div className="flex flex-row gap-5">
                                <a href="https://www.instagram.com/itcc_udayana/" target="_blank">
                                    <IconInstagram />
                                </a>
                                <a href="https://www.tiktok.com/@itccudayana?_t=ZS-8wChNNcVxgo&_r=1" target="_blank">
                                    <IconTiktok />
                                </a>
                                <a href="https://www.facebook.com/ITCC.Udayana/?locale=id_ID" target="_blank">
                                    <IconFacebook />
                                </a>
                                <a href="https://www.youtube.com/channel/UCv949bv5-KQMECAPVfxuGTw" target="_blank">
                                    <IconYoutube />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h1 className="text-white font-semibold text-[18px]">Quick Links</h1>

                            <Link
                                // href={route('event.front.show', ['seminar-nasional-teknologi-informasi-of'])}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Home <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>

                            <Link
                                // href={route('merchandise.front.show')}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Open Recruitmen <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>

                            <Link
                                // href={route('event.front.show', ['seminar-nasional-teknologi-informasi-of'])}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Struktur Organisasi <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>

                            <Link
                                // href={route('merchandise.front.show')}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Program Kerja <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-5">
                                <h1 className="text-white font-semibold text-[18px]">Terkait</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    UNUD | Teknologi Informasi
                                </p>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    BEM PM Udayana
                                </p>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    SMFT UNUD
                                </p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-white font-semibold text-[18px]">Bug Report</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    +62881038194017
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white font-semibold text-[18px]">Alamat</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    Jl. Kampus Udayana Bukit Jimbaran, Jimbaran, Kuta Selatan, Kabupaten Badung, Bali 80361
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white font-semibold text-[18px]">No. Telepon</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    (0361) 701806
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white font-semibold text-[18px]">Email</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    hmti@unud.ac.id
                                </p>
                            </div>
                        </div>



                    </div>
                    <div className="py-6 px-12 bg-[#000000] flex justify-start">
                        <p className="text-white">© 2025 Kabinet Harmoni</p>
                    </div>
                    {/* <ScrollToTop /> */}
                </footer>
            </div>


            <div className="md:hidden">
                <div className="relative w-full">
                    <img src="/assets/icon/hiasan_left_footer.png" alt="Ornament Left" className="absolute left-0 -top-12 w-[47px] h-[47px]" />
                    <img src="/assets/icon/hiasan_center_footer.png" alt="Ornament Left" className="absolute left-1/2 -translate-x-1/2 -top-9 w-[267px] h-[47px]" />
                    <img src="/assets/icon/hiasan_right_footer.png" alt="Ornament Left" className="absolute right-0 -top-12 w-[47px] h-[47px]" />
                </div>
                <footer className="bg-[#071108] ">
                    <div className="flex flex-col mb-10 w-full px-5 py-12 gap-10">

                        <div className="flex flex-col gap-5">
                            <div>
                                <Link
                                    href={route('welcome')}
                                >
                                    <img src={`${window.location.origin}/assets/icon/logo_hmti.png`} alt="" className="w-auto h-[80px]" />
                                </Link>
                            </div>
                            <p className="text-[18px] text-white md:w-[420px] w-full">
                                Himpunan Mahasiswa Teknologi Informasi, Fakultas Teknik, Universitas Udayana
                            </p>
                            <div className="flex flex-row gap-5">
                                <a href="https://www.instagram.com/itcc_udayana/" target="_blank">
                                    <IconInstagram />
                                </a>
                                <a href="https://www.tiktok.com/@itccudayana?_t=ZS-8wChNNcVxgo&_r=1" target="_blank">
                                    <IconTiktok />
                                </a>
                                <a href="https://www.facebook.com/ITCC.Udayana/?locale=id_ID" target="_blank">
                                    <IconFacebook />
                                </a>
                                <a href="https://www.youtube.com/channel/UCv949bv5-KQMECAPVfxuGTw" target="_blank">
                                    <IconYoutube />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h1 className="text-white font-semibold text-[18px]">Quick Links</h1>

                            <Link
                                // href={route('event.front.show', ['seminar-nasional-teknologi-informasi-of'])}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Home <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>

                            <Link
                                // href={route('merchandise.front.show')}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Open Recruitmen <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>

                            <Link
                                // href={route('event.front.show', ['seminar-nasional-teknologi-informasi-of'])}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Struktur Organisasi <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>

                            <Link
                                // href={route('merchandise.front.show')}
                                className="text-white flex flex-row justify-start items-center gap-2 group"
                            >
                                Program Kerja <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-3" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-5">
                                <h1 className="text-white font-semibold text-[18px]">Terkait</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    UNUD | Teknologi Informasi
                                </p>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    BEM PM Udayana
                                </p>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    SMFT UNUD
                                </p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-white font-semibold text-[18px]">Bug Report</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    +62881038194017
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white font-semibold text-[18px]">Alamat</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    Jl. Kampus Udayana Bukit Jimbaran, Jimbaran, Kuta Selatan, Kabupaten Badung, Bali 80361
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white font-semibold text-[18px]">No. Telepon</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    (0361) 701806
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white font-semibold text-[18px]">Email</h1>
                                <p className="text-[14px] leading-[140%] text-white md:w-[280px] w-full">
                                    hmti@unud.ac.id
                                </p>
                            </div>
                        </div>



                    </div>
                    <div className="py-6 px-12 bg-[#000000] flex justify-start">
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
