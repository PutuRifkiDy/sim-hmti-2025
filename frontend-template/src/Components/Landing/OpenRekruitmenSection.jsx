import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function OpenRekruitmenSection() {
  return (
    <div className='w-full px-[32px] py-[16px] flex flex-col items-center'>
        <div className="header-oprec w-[95%] mb-[32px] flex justify-between items-end">
            <div className="inner-header-oprec flex flex-col">
                <h1 className='text-[#ECC067] font-bold text-[30px]'>OPEN RECRUITMENT</h1>
                <p>Ayo daftarkan dirimu dalam kegiatan-kegiatan HMTI, kami tunggu kontribusi kalian!</p>
            </div>
            <a href=""className='flex items-center h-fit'>
                See More
                <img src="right-arrow.png" alt="right arrow" className='w-[20px] h-[20px] ml-[12px]' />
            </a>
        </div>
        <div className="slider-oprec w-[95%]">        
            <Swiper
            modules={[FreeMode, Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            freeMode={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            grabCursor={true}
            loop={true}
            breakpoints={{
                1440: {
                slidesPerView: 4,
                },
                1024: {
                slidesPerView: 3,
                },
                768: {
                slidesPerView: 2,
                },
                0: {
                slidesPerView: 1,
                },
            }}
            >
                <SwiperSlide className="w-[20vw]">
                    <div className="h-fit w-[20vw] flex flex-col items-center p-[10px] justify-center text-xl rounded-[20px] border-[1px] border-[#ECBB4E] border-solid ">
                        <img src="Pamflet-OPREC-Vertical_11zon.jpg" alt="Pamflet" className='w-full h-fit rounded-[20px]' />
                        <div className="area-header-pamflet w-full flex justify-between items-end mt-[8px]">
                            <div className="header-pamflet flex flex-col">
                                <h1 className='text-[20px] font-semibold h-fit leading-[100%] my-[8px]'>ITCC 2025</h1>
                                <p className='text-[12px] leading-[100%] mb-[8px]'>01 Apr 2025 - 11 Apr 2025</p>
                            </div>
                            <a href="" className='flex items-center h-fit text-[14px] text-white font-bold py-[6px] px-[22px] bg-[#ECBB4E] rounded-[10px] shadow-[0_0_19px_#ECBB4E]'>
                                Join
                                <img src="right-arrow-white.png" alt="right arrow" className='w-[20px] h-[20px] ml-[12px]' />
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="w-[20vw]">
                    <div className="h-fit w-[20vw] flex flex-col items-center p-[10px] justify-center text-xl rounded-[20px] border-[1px] border-[#ECBB4E] border-solid ">
                        <img src="PAMFLET-4X5-IT-ESEGA-2025.jpg" alt="Pamflet" className='w-full h-fit rounded-[20px]' />
                        <div className="area-header-pamflet w-full flex justify-between items-end mt-[8px]">
                            <div className="header-pamflet flex flex-col">
                                <h1 className='text-[20px] font-semibold h-fit leading-[100%] my-[8px]'>IT-ESEGA 2025</h1>
                                <p className='text-[12px] leading-[100%] mb-[8px]'>01 Apr 2025 - 11 Apr 2025</p>
                            </div>
                            <a href="" className='flex items-center h-fit text-[14px] text-white font-bold py-[6px] px-[22px] bg-[#ECBB4E] rounded-[10px] shadow-[0_0_19px_#ECBB4E]'>
                                Join
                                <img src="right-arrow-white.png" alt="right arrow" className='w-[20px] h-[20px] ml-[12px]' />
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="w-[20vw]">
                    <div className="h-fit w-[20vw] flex flex-col items-center p-[10px] justify-center text-xl rounded-[20px] border-[1px] border-[#ECBB4E] border-solid ">
                        <img src="Pamflet-Oprec-Portrait.png" alt="Pamflet" className='w-full h-fit rounded-[20px]' />
                        <div className="area-header-pamflet w-full flex justify-between items-end mt-[8px]">
                            <div className="header-pamflet flex flex-col">
                                <h1 className='text-[20px] font-semibold h-fit leading-[100%] my-[8px]'>ITVERSARY-17</h1>
                                <p className='text-[12px] leading-[100%] mb-[8px]'>01 Apr 2025 - 11 Apr 2025</p>
                            </div>
                            <a href="" className='flex items-center h-fit text-[14px] text-white font-bold py-[6px] px-[22px] bg-[#ECBB4E] rounded-[10px] shadow-[0_0_19px_#ECBB4E]'>
                                Join
                                <img src="right-arrow-white.png" alt="right arrow" className='w-[20px] h-[20px] ml-[12px]' />
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="w-[20vw]">
                    <div className="h-fit w-[20vw] flex flex-col items-center p-[10px] justify-center text-xl rounded-[20px] border-[1px] border-[#ECBB4E] border-solid ">
                        <img src="IMG_2699-_1_-(1).jpeg" alt="Pamflet" className='w-full h-fit rounded-[20px]' />
                        <div className="area-header-pamflet w-full flex justify-between items-end mt-[8px]">
                            <div className="header-pamflet flex flex-col">
                                <h1 className='text-[20px] font-semibold h-fit leading-[100%] my-[8px]'>SPORTI 2025</h1>
                                <p className='text-[12px] leading-[100%] mb-[8px]'>01 Apr 2025 - 11 Apr 2025</p>
                            </div>
                            <a href="" className='flex items-center h-fit text-[14px] text-white font-bold py-[6px] px-[22px] bg-[#ECBB4E] rounded-[10px] shadow-[0_0_19px_#ECBB4E]'>
                                Join
                                <img src="right-arrow-white.png" alt="right arrow" className='w-[20px] h-[20px] ml-[12px]' />
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="w-[20vw]">
                    <div className="h-fit w-[20vw] flex flex-col items-center p-[10px] justify-center text-xl rounded-[20px] border-[1px] border-[#ECBB4E] border-solid ">
                        <img src="Pamflet-OPREC-Vertical_11zon.jpg" alt="Pamflet" className='w-full h-fit rounded-[20px]' />
                        <div className="area-header-pamflet w-full flex justify-between items-end mt-[8px]">
                            <div className="header-pamflet flex flex-col">
                                <h1 className='text-[20px] font-semibold h-fit leading-[100%] my-[8px]'>ITCC 2024</h1>
                                <p className='text-[12px] leading-[100%] mb-[8px]'>01 Apr 2025 - 11 Apr 2025</p>
                            </div>
                            <a href="" className='flex items-center h-fit text-[14px] text-white font-bold py-[6px] px-[22px] bg-[#ECBB4E] rounded-[10px] shadow-[0_0_19px_#ECBB4E]'>
                                Join
                                <img src="right-arrow-white.png" alt="right arrow" className='w-[20px] h-[20px] ml-[12px]' />
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  );
}