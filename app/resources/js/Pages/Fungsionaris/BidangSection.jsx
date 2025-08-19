import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Button } from "@/Components/ui/button";
import { useEffect } from "react";
import * as AOS from 'aos';
import 'aos/dist/aos.css';
export default function BidangSection({
    buttons = [],
    activeIndex = 0,
    onChange = () => { },
    kabidCard = { nama: "-", jabatan: "Kabid", foto: "/placeholder-user.png" },
    kadivCards = [],
}) {
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
    const ProfileCard = ({ foto, nama, jabatan }) => (
        <div className="flex flex-col items-center">
            <div className="relative w-[69px] h-[69px] sm:w-[160px] sm:h-[160px] mt-6 sm:mt-14">
                <div className="absolute inset-[5px] sm:inset-[12px] rounded-full overflow-hidden">
                    <img src={foto || "/placeholder-user.png"} alt={nama} className="w-full h-full object-cover" />
                </div>

                {/* outer arc */}
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 01182 0" stroke="#7B4B27" strokeWidth="6" strokeLinecap="round" />
                </svg>
                {/* dashed arc */}
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 00182 0" stroke="#7B4B27" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
                </svg>
            </div>

            <div className="mt-4 flex justify-center w-[159.791px] h-[21.79px] text-[#785233] font-black leading-none tracking-[-1.017px] whitespace-nowrap text-center text-[clamp(1rem,4vw,25px)]">
                {nama ?? "-"}
            </div>
            <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-semibold leading-none tracking-[-0.581px] text-[clamp(0.75rem,3vw,14.5px)]">
                {jabatan ?? "-"}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center text-center pt-[5%] sm:pt-[6%] md:pt-[7%] lg:pt-[8%] w-full max-w-[95%] mx-auto px-4">
            <h1
                data-aos="fade-up" data-aos-duration="600"
                className="text-[#ecc067] font-poppins font-black leading-[1.1] tracking-[-0.06em] uppercase text-[clamp(2rem,6vw,5.5rem)] -mt-[0.5em]">
                BIDANG
            </h1>

            {/* Swiper Buttons */}
            <div className="w-full mt-6">
                <Swiper
                    modules={[FreeMode]}
                    freeMode
                    grabCursor
                    spaceBetween={20}
                    breakpoints={{
                        320: { slidesPerView: 2, centeredSlides: true, allowTouchMove: true },
                        640: { slidesPerView: 3, centeredSlides: false, allowTouchMove: true },
                        1024: { slidesPerView: 4, centeredSlides: false, allowTouchMove: true },
                    }}
                    className="flex justify-center lg:ml-[-10px]"
                >
                    {buttons.map((label, idx) => (
                        <SwiperSlide key={`bidang-${idx}`} className="flex justify-center !w-auto">
                            <Button
                                data-aos="fade-up" data-aos-duration={(idx + 1) * 200}
                                variant="gold"
                                type="button"
                                onClick={() => onChange(idx)}
                                className={`flex justify-center items-center w-[183px] px-0 py-[8.6px] rounded-[7.215px] font-semibold transition duration-200 mx-auto ${activeIndex === idx
                                    ? "bg-[#ecc067] text-white border border-[#ecc067]"
                                    : "text-[#ecc067] bg-white border border-[#ecc067] hover:bg-[#ecc067] hover:text-white"
                                    }`}
                                style={{ flexShrink: 0 }}
                            >
                                {label}
                            </Button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Kabid (kartu besar di tengah) */}
            <div className="relative w-[69px] h-[69px] sm:w-[160px] sm:h-[160px] mt-6 sm:mt-14">
                <div className="absolute inset-[5px] sm:inset-[12px] rounded-full overflow-hidden">
                    <img src={kabidCard.foto || "/placeholder-user.png"} alt={kabidCard.nama} className="w-full h-full object-cover" />
                </div>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 01182 0" stroke="#7B4B27" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 00182 0" stroke="#7B4B27" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
                </svg>
            </div>

            <div className="mt-4 flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-black leading-none tracking-[-1.017px] whitespace-nowrap text-[clamp(1rem,4vw,25px)]">
                {kabidCard.nama ?? "-"}
            </div>
            <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-semibold leading-none tracking-[-0.581px] text-[clamp(0.75rem,3vw,14.5px)]">
                {kabidCard.jabatan ?? "-"}
            </div>

            {/* Kadiv */}
            <div className="mt-10 w-full">
                {/* Mobile layout */}
                <div className="flex flex-col items-center gap-6 sm:hidden">
                    <div className="flex gap-6">
                        {kadivCards[0] && <ProfileCard {...kadivCards[0]} />}
                        {kadivCards[1] && <ProfileCard {...kadivCards[1]} />}
                    </div>
                    <div className="flex gap-6">
                        {kadivCards[2] && <ProfileCard {...kadivCards[2]} />}
                        {kadivCards[3] && <ProfileCard {...kadivCards[3]} />}
                    </div>
                    {kadivCards[4] && <ProfileCard {...kadivCards[4]} />}
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:flex flex-wrap justify-center gap-16 max-w-full">
                    {kadivCards.map((item, i) => (
                        <ProfileCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
