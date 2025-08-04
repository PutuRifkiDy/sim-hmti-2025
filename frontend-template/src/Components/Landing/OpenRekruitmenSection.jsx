import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function OpenRekruitmenSection() {
  return (
    <Swiper
      modules={[FreeMode, Autoplay, Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={'auto'}
      freeMode={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      grabCursor={true}
      loop={true}
    >
      <SwiperSlide className="w-[20vw]">
        <div className="bg-red-500 h-48 flex w-[20vw] items-center justify-center text-white text-xl rounded-xl shadow-lg">
          Slide 1
        </div>
      </SwiperSlide>
      <SwiperSlide className="w-[20vw]">
        <div className="bg-blue-500 h-48 flex w-[20vw] items-center justify-center text-white text-xl rounded-xl shadow-lg">
          Slide 2
        </div>
      </SwiperSlide>
      <SwiperSlide className="w-[20vw]">
        <div className="bg-green-500 h-48 flex w-[20vw] items-center justify-center text-white text-xl rounded-xl shadow-lg">
          Slide 3
        </div>
      </SwiperSlide>
      <SwiperSlide className="w-[20vw]">
        <div className="bg-yellow-500 h-48 flex w-[20vw] items-center justify-center text-white text-xl rounded-xl shadow-lg">
          Slide 4
        </div>
      </SwiperSlide>
    </Swiper>
  );
}