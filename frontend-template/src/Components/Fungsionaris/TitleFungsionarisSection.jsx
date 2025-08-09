import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TitleFungsionarisSection() {
  const items = ["Harmoni", "Kolaborasi", "Revolusi", "Sinergi"];

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
      >
        FUNGSIONARIS
      </h1>

      <div className="w-full mt-8 overflow-x-hidden">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          centeredSlides={true}
          pagination={false}
          navigation={false}
          breakpoints={{
            320: { slidesPerView: 1.1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-[5vw]"
        >
          {items.map((item) => (
            <SwiperSlide
              key={item}
              className="
                !w-full 
                sm:!w-[240px] 
                md:!w-[280px]
              "
            >
              <div
                className="flex justify-center items-center rounded-[10px] border border-[#ECC067] bg-[#ECC067]"
                style={{ padding: "12px 48px 13px 47px" }}
              >
                <p className="text-white font-semibold">Kabinet {item}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
