import { useEffect } from "react";
import * as AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutSection({ youtube_link }) {
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
            <div
                className="bg-[url('/assets/images/bg-about.png')] bg-opacity-80 dark:bg-[url('/assets/images/bg-about-dark.png')] bg-cover bg-fixed w-full h-full relative flex-shrink-0 bg-no-repeat"
            >
                <div className="flex flex-col md:flex-row items-center md:items-center h-full justify-between py-24">
                    <div className="md:w-1/2 w-full flex flex-col md:flex-row items-center md:items-start p-5 md:p-12 space-x-0 md:space-x-4">
                        <div className="text-left flex flex-col items-center md:items-start">
                            <div className="relative">
                                <span
                                    data-aos="fade-up"
                                    data-aos-duration="600"
                                    className="block text-5xl md:text-7xl lg:text-7xl font-normal text-[#785233] leading-none"
                                    style={{ fontFamily: "Arrintika Signature, cursive" }}
                                >
                                    About
                                </span>
                                <h1
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    className="uppercase text-5xl md:text-7xl tracking-tighter lg:text-7xl font-black text-[#ECC067] leading-none -mt-2 md:-mt-4 font-poppins">
                                    HMTI
                                </h1>
                            </div>
                            <p
                                data-aos="fade-up"
                                data-aos-duration="1400"
                                className="mt-4 md:mt-6 text-black md:text-2xl text-base leading-relaxed font-poppins text-justify dark:text-white">
                                Himpunan Mahasiswa Teknologi Informasi atau biasa disebut HMTI
                                merupakan organisasi kemahasiswaan di lingkungan Program Studi
                                Teknologi Informasi, Fakultas Teknik, Universitas Udayana. <br />{" "} <br />
                                HMTI berfungsi sebagai sarana untuk menampung dan
                                menyalurkan aspirasi mahasiswa Teknologi Informasi, dan juga
                                sebagai wadah mahasiswa untuk melatih diri dalam berorganisasi dan
                                memimpin.
                            </p>
                        </div>
                    </div>
                    <div className="px-5 md:w-1/2 mx-6 md:mx-0 w-full relative flex justify-center">
                        <div className="w-full max-w-[500px] h-auto relative overflow-hidden flex justify-center items-center">
                            <iframe
                                src={youtube_link}
                                className="w-full h-auto aspect-video rounded-lg"
                                allowFullScreen
                                data-aos="zoom-in"
                                data-aos-duration="1500"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
