import React from 'react';
import { useEffect } from "react";
import * as AOS from 'aos';
import 'aos/dist/aos.css';
const TitleProgramKerjaSection = () => {
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
        <div className="text-center mt-10 mb-6 sm:mb-20">
            <div
                className="relative flex h-[70px] md:h-[120px]"
                data-aos="fade-up"
                data-aos-duration="600">
                <span
                    // data-aos="fade-up"
                    // data-aos-duration="600"
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-10 text-[38px] md:text-[78px] leading-none text-[#8B5E3C]"
                    style={{ fontFamily: 'Arinttika Signature Demo' }}
                >
                    Program
                </span>
                <span
                    // data-aos="fade-up"
                    // data-aos-duration="600"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 text-[52px] md:text-[88px] font-extrabold text-[#E4B45C] leading-none font-poppins"
                >
                    KERJA
                </span>
            </div>
            <p
                className="text-[10px] md:text-sm text-gray-800 dark:text-white"
                style={{ fontFamily: 'Rubik' }}
                data-aos="fade-up"
                data-aos-duration="1200"
            >
                Daftar Program Kerja dalam naungan
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                Himpunan Mahasiswa Teknologi Informasi
            </p>
        </div>
    );
};

export default TitleProgramKerjaSection;
