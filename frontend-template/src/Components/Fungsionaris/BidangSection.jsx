import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function TitleFungsionarisSection() {
  const bidangList = [
    "KOMINFO",
    "ILMIAH",
    "BURSA",
    "MIKAT",
    "SARPRAS",
    "ROHANI",
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex flex-col items-center text-center pt-[5%] sm:pt-[6%] md:pt-[7%] lg:pt-[8%] w-full max-w-[95%] mx-auto px-4">
      {/* Judul */}
      <h1
        className="
          text-[#ecc067]
          font-poppins font-black leading-[1.1]
          tracking-[-0.06em] uppercase
          whitespace-nowrap
          text-[clamp(2rem,6vw,5.5rem)]
          -mt-[0.5em]
        "
      >
        BIDANG
      </h1>

      {/* Swiper Buttons */}
      <div className="w-full mt-6">
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          grabCursor={true}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 2,
              centeredSlides: true,
              allowTouchMove: true,
            },
            640: {
              slidesPerView: 3,
              centeredSlides: false,
              allowTouchMove: true,
            },
            1024: {
              slidesPerView: 4,
              centeredSlides: false,
              allowTouchMove: true,
            },
          }}
          className="flex justify-center lg:ml-[-10px]"
        >
          {bidangList.map((bidang, index) => (
            <SwiperSlide
              key={`bidang-${index}`}
              className="flex justify-center !w-auto"
            >
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev === index ? null : index))
                }
                className={`
                  flex justify-center items-center
                  w-[183px] px-0 py-[8.6px]
                  rounded-[7.215px]
                  font-semibold
                  transition duration-200
                  mx-auto
                  ${
                    activeIndex === index
                      ? "bg-[#ecc067] text-white border border-[#ecc067] shadow-[0_0_10px_#ecc067]"
                      : "bg-white text-[#ecc067] border border-[#ecc067] shadow-[0_0_6px_#ecc067] hover:bg-[#ecc067] hover:text-white hover:shadow-[0_0_10px_#ecc067]"
                  }
                `}
                style={{ flexShrink: 0 }}
              >
                {bidang}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
