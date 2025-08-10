import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TitleFungsionarisSection() {
  return (
    <div className="flex flex-col items-center text-center pt-[5%] sm:pt-[6%] md:pt-[7%] lg:pt-[8%] w-full max-w-[95%] mx-auto px-4">
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
        INTI
      </h1>
    </div>
  );
}
