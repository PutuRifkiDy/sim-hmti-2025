import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { useEffect } from "react";
import * as AOS from 'aos';
import 'aos/dist/aos.css';
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
            <div className='w-full md:px-6 px-5 py-[16px] flex flex-col items-center pb-36 bg-white dark:bg-[#1f1f1f] z-10'>
                <div className="header-oprec w-[95%] mb-[32px] flex justify-between md:items-end items-center flex-col md:flex-row">
                    <div className="inner-header-oprec flex flex-col items-center md:items-start">
                        <h1
                            data-aos="fade-up"
                            data-aos-duration="600"
                            className='text-[#ECC067] font-black font-poppins text-[30px] text-center md:text-start'>OPEN RECRUITMENT</h1>
                        <p
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            className='text-center md:text-start'>Ayo daftarkan dirimu dalam kegiatan-kegiatan HMTI, kami tunggu kontribusi kalian!</p>
                    </div>
                    <Link
                        data-aos="fade-up"
                        data-aos-duration="1200"
                        href={route('oprec-regist.index')} className='flex items-center h-fit mt-[20px] md:mt-[0px] group'>
                        Lihat Semua
                        <ArrowRightIcon className='w-[20px] h-[20px] ml-[12px] transform transition-transform duration-300 group-hover:translate-x-1' />
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
                        className='h-full'
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        {oprecs.map((oprec, index) => (
                            <SwiperSlide key={index}
                            >
                                <Link
                                    href={route('oprec-regist.show', oprec.id)}
                                >
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
                                        <div className="area-header-pamflet w-full flex justify-between items-end mt-[8px]">
                                            <div className="header-pamflet flex flex-col">
                                                <h1 className='text-[20px] font-semibold h-fit leading-[100%] my-[8px] line-clamp-1'>{oprec?.oprec_name}</h1>
                                                <p className='text-[12px] leading-[100%] mb-[8px]'>
                                                    {templateDateTime(oprec?.start_date)} - {templateDateTime(oprec?.end_date)}
                                                </p>
                                            </div>
                                            <Button variant="gold" type="button" asChild className="shadow-[0_0_15px_#ECBB4E]">
                                                <Link
                                                    href={route('oprec-regist.show', oprec.id)}
                                                    className="flex flex-row items-center gap-1 px-2 text-[14px] font-bold text-white group"
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
