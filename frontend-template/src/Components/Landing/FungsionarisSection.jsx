"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function FungsionarisSection() {
  const members = [
    { img: "/Rama.jpg", role: "Ketua", name: "Setiawan Rama Putra" },
    {
      img: "/Arya.jpg",
      role: "Wakil Ketua I",
      name: "I Made Arya Adi Pramana",
    },
    { img: "/Damar.jpg", role: "Wakil Ketua II", name: "Damar" },
    { img: "/Gita.jpg", role: "Sekretaris I", name: "Gita" },
    { img: "/Putri.jpg", role: "Sekretaris II", name: "Komang Dwi Putri" },
    { img: "/Yurista.jpg", role: "Bendahara I", name: "Yurista" },
    { img: "/DC.jpg", role: "Bendahara II", name: "DC" },
  ];

  return (
    <div
      className="
        relative w-full flex-shrink-0
        aspect-[97/65]           
         min-h-[543px] md:min-h-[700px] lg:min-h-[965px]
        bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0)_37.34%,rgba(255,255,255,0)_59.78%,#FFF_100%),url('/fungsionaris.jpg')]
        bg-cover bg-[center_80%] sm:bg-[center_80%] lg:bg-[center_70%]
        bg-no-repeat overflow-hidden
      "
    >
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

        <div className="mt-[clamp(1.5rem,4vw,3rem)] w-full">
          <Swiper spaceBetween={16} slidesPerView={"auto"}>
            {members.map((m, idx) => (
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
                    backgroundImage: `url(${m.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-sm sm:text-base font-semibold text-left">
                      {m.role}
                    </p>
                    <p className="text-[12px] sm:text-sm opacity-80 text-left">
                      {m.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          className="
            mt-10 sm:mt-12 md:mt-14 lg:mt-16
            flex items-center justify-center gap-2
            px-[clamp(1rem,3vw,2rem)]
            py-[clamp(0.4rem,1vw,0.6rem)]
            rounded-[8px]
            border border-[#ECBB4E]
            bg-[#ECBB4E]
            shadow-[0_0_19px_0_#ECBB4E]
            hover:opacity-90 transition
          "
        >
          <span
            className="
              text-white font-inter font-bold
              text-[clamp(12px,1.2vw,14px)]
            "
          >
            See All Fungsionaris
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[clamp(16px,2vw,20px)] h-[clamp(16px,2vw,20px)]"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M12.0469 6.89459C11.8477 7.0899 11.8477 7.41412 12.043 7.61334L14.418 9.99224H5.37891C5.10156 9.99224 4.875 10.2188 4.875 10.5001C4.875 10.7813 5.10156 11.0079 5.37891 11.0079H14.4141L12.0391 13.3868C11.8438 13.586 11.8477 13.9063 12.043 14.1055C12.2422 14.3008 12.5586 14.3008 12.7578 14.1016L15.9766 10.8594C16.0195 10.8126 16.0547 10.7618 16.082 10.6993C16.1094 10.6368 16.1211 10.5704 16.1211 10.504C16.1211 10.3712 16.0703 10.2462 15.9766 10.1485L12.7578 6.90631C12.5664 6.70318 12.2461 6.69928 12.0469 6.89459Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
