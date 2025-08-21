import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import * as AOS from 'aos';
import 'aos/dist/aos.css';
export default function FungsionarisSection({ cover_path, fungsionaris }) {
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
        <div
            className={`relative w-full flex-shrink-0 aspect-[97/65]
              min-h-[543px] md:min-h-[700px] lg:min-h-[965px]
              bg-cover bg-[center_80%] sm:bg-[center_80%]
              lg:bg-[center_70%] bg-no-repeat overflow-hidden`}
            style={{
                backgroundImage: `url(${cover_path})`
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-white/100 via-white/0 to-white/100 dark:hidden" />

            {/* overlay gradient dark */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F]/100 via-[#1F1F1F]/0 to-[#1F1F1F]/100 hidden dark:block" />
            <div
                className="
          absolute top-0 left-1/2 -translate-x-1/2
          flex flex-col items-center text-center
          pt-[5%] sm:pt-[6%] md:pt-[7%]
          w-full max-w-[95%]
          z-10
        "
            >
                <h2
                    className="
            text-[#785233]
            font-arinttika font-normal leading-[1.1]
            whitespace-nowrap
            text-[clamp(2rem,5vw,4.75rem)]
            z-20
          "
                    data-aos="fade-up"
                    data-aos-duration="600"
                >
                    Susunan
                </h2>

                <h1
                    className="
            text-[#ecc067]
            font-poppins font-black leading-[1.1]
            uppercase
            whitespace-nowrap
            text-[clamp(2rem,6vw,5.5rem)]
            -mt-[0.5em] tracking-tighter
          "
                    data-aos="fade-up"
                    data-aos-duration="1200"
                >
                    FUNGSIONARIS
                </h1>

                <div
                    className="mt-[clamp(1.5rem,4vw,3rem)] w-full px-2"
                    data-aos="fade-up"
                    data-aos-duration="800"
                >
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                        {fungsionaris.map((m, idx) => (
                            <SwiperSlide
                                key={idx}
                                style={{
                                    width: "clamp(180px, 40vw, 300px)",
                                    height: "clamp(180px, 40vw, 300px)",
                                    aspectRatio: "4 / 3",
                                    flexShrink: 0,
                                }}
                            >
                                <div
                                    className="relative w-full h-full rounded-lg overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${m.img_himpunan_path})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                                    <div className="absolute bottom-3 left-3 text-white">
                                        <p className="text-sm sm:text-base font-semibold text-left">
                                            {m.position.title}
                                        </p>
                                        <p className="text-[12px] sm:text-sm opacity-80 text-left">
                                            {m.user.name}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <Button
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    variant="gold"
                    type="button"
                    asChild
                    className="shadow-[0_0_15px_#ECBB4E] px-16 py-5 animate-bounce transition-all duration-1000 ease-in-out md:mt-28 mt-12">
                    <Link
                        href={route('fungsionaris')}
                        className="group"
                    >
                        Lihat Semua Fungsionaris
                        <ArrowRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
