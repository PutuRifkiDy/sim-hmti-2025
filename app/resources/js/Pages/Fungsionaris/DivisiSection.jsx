import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Button } from "@/Components/ui/button";
import * as AOS from 'aos';
import 'aos/dist/aos.css';
export default function DivisiSection({ groups = [] }) {
    const [active, setActive] = useState(0);
    useEffect(() => {
        setActive(0);
    }, [groups.length]);

    const labels = (groups || []).map((g) => g.label ?? "-");
    const activeGroup = groups[active] || null;

    const kadivCard = activeGroup?.kadivCard ?? { nama: "-", jabatan: "Kadiv", foto: "/placeholder-user.png" };
    const anggota = activeGroup?.anggota ?? [];


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
                <div className="absolute inset-[12px] rounded-full overflow-hidden">
                    <img src={foto || "/placeholder-user.png"} alt={nama} className="w-full h-full object-cover" />
                </div>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 01182 0" stroke="#7B4B27" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 00182 0" stroke="#7B4B27" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
                </svg>
            </div>

            <div className="mt-4 flex justify-center w-[159.791px] text-[#785233] font-black leading-none tracking-[-1.017px] text-center text-[clamp(1rem,4vw,18px)]">
                    {nama ?? "-"}
            </div>
            <div className="mt-2 flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-semibold leading-none tracking-[-0.581px] text-[clamp(0.75rem,3vw,14.5px)] whitespace-nowrap">
                {jabatan ?? "-"}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center text-center pt-[5%] sm:pt-[6%] md:pt-[7%] lg:pt-[8%] w-full max-w-[95%] mx-auto px-4">
            <h1
                data-aos="fade-up" data-aos-duration="600"
                className="text-[#ecc067] font-poppins font-black leading-[1.1] tracking-[-0.06em] uppercase whitespace-nowrap text-[clamp(2rem,6vw,5.5rem)] -mt-[0.5em]">
                {kadivCard.jabatan == "Kabid Rohani" ? "Anggota Rohani" : "Divisi"}
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
                    {labels.map((label, idx) => (
                        <SwiperSlide key={`divisi-${idx}`} className="flex justify-center !w-auto">
                            <Button
                                variant="gold"
                                type="button"
                                onClick={() => setActive(idx)}
                                className={`flex justify-center items-center w-[183px] px-0 py-[8.6px] rounded-[7.215px] font-semibold transition duration-200 mx-auto ${active == idx
                                    ? "bg-[#ecc067] text-white border border-[#ecc067]"
                                    : "dark:bg-[#1f1f1f] bg-white text-[#ecc067] border border-[#ecc067] hover:bg-[#ecc067] hover:text-white"
                                    }`}
                                style={{ flexShrink: 0 }}
                            >
                                {label}
                            </Button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Kadiv (kartu besar) */}
            <div className="relative w-[69px] h-[69px] sm:w-[160px] sm:h-[160px] mt-6 sm:mt-14">
                <div className="absolute inset-[5px] sm:inset-[12px] rounded-full overflow-hidden">
                    <img src={kadivCard.foto || "/placeholder-user.png"} alt={kadivCard.nama} className="w-full h-full object-cover" />
                </div>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 01182 0" stroke="#7B4B27" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 00182 0" stroke="#7B4B27" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
                </svg>
            </div>

            <div className="mt-4 flex justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-black leading-none tracking-[-1.017px] whitespace-nowrap text-[clamp(1rem,4vw,18px)]">
                {kadivCard.nama ?? "-"}
            </div>
            <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-semibold leading-none tracking-[-0.581px] text-[clamp(0.75rem,3vw,14.5px)]">
                {kadivCard.jabatan ?? "-"}
            </div>

            {/* Anggota */}
            <div className="mt-10 w-full">
                {/* Mobile layout */}
                <div className="flex flex-col items-center gap-6 sm:hidden">
                    <div className="flex gap-6">
                        {anggota[0] && <ProfileCard {...anggota[0]} />}
                        {anggota[1] && <ProfileCard {...anggota[1]} />}
                    </div>
                    <div className="flex gap-6">
                        {anggota[2] && <ProfileCard {...anggota[2]} />}
                        {anggota[3] && <ProfileCard {...anggota[3]} />}
                    </div>
                    {anggota[4] && <ProfileCard {...anggota[4]} />}
                </div>

                {/* Desktop layout */}
                <div className="hidden sm:flex flex-wrap justify-center gap-16 max-w-full">
                    {anggota.map((item, i) => (
                        <ProfileCard key={i} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
