import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { useEffect } from "react";
import * as AOS from 'aos';
import 'aos/dist/aos.css';
export default function TitleFungsionarisSection() {
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
        <div className="flex flex-col items-center text-center pt-[5%] sm:pt-[6%] md:pt-[7%] lg:pt-[8%] w-full max-w-[95%] mx-auto px-4">
            <h2
                className="
          text-[#785233]
          font-arinttika font-normal leading-[1.1]
          whitespace-nowrap
          text-[clamp(2rem,5vw,4.75rem)]
          z-10
        "
                data-aos="fade-up" data-aos-duration="600"
            >
                Susunan
            </h2>

            <h1
                className="
          text-[#ecc067]
          font-poppins font-bold leading-[1.1]
          tracking-[-0.06em] uppercase
          whitespace-nowrap
          text-[clamp(2rem,6vw,5.5rem)]
          -mt-[0.5em]
        "
                data-aos="fade-up" data-aos-duration="1200"
            >
                FUNGSIONARIS
            </h1>
        </div>
    );
}
