import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";

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

      <div className="w-full mt-8">
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          spaceBetween={20}
          centeredSlides={true}
          pagination={false}
          navigation={false}
          breakpoints={{
            360: {
              slidesPerView: 1.2,
              centeredSlides: true,
              slidesOffsetBefore: 65,
              allowTouchMove: true,
            },
            640: {
              slidesPerView: 1.2,
              centeredSlides: true,
              slidesOffsetBefore: 40,
              allowTouchMove: true,
            },
            1024: {
              slidesPerView: 3,
              centeredSlides: true,
              allowTouchMove: true,
            },
          }}
          className="px-0 sm:px-[5vw]"
        >
          {items.map((item) => (
            <SwiperSlide
              key={item}
              className="
    !w-[clamp(140px,40vw,180px)]
    sm:!w-[clamp(200px,30vw,240px)]
    md:!w-[clamp(240px,25vw,280px)]
  "
            >
              <div
                className="
      flex justify-center items-center 
      rounded-[10px] border border-[#ECC067] bg-[#ECC067]
      px-[clamp(12px,4vw,24px)] 
      py-[clamp(8px,2vw,13px)]
    "
              >
                <p className="text-white font-semibold text-[clamp(0.75rem,3vw,1.25rem)]">
                  Kabinet {item}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
