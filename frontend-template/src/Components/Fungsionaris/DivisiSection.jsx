import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function DivisiSection() {
  const divisiList = [
    "DIVISI 1",
    "DIVISI 2",
    "DIVISI 3",
    "DIVISI 4",
    "DIVISI 5",
    "DIVISI 5",
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const kadiv = {
    nama: "Krishna",
    jabatan: "Kadiv Humas Internal",
    foto: "/Krisnha.jpg",
  };

  const anggota = [
    {
      nama: "Anggota 1",
      jabatan: "Anggota Humas Internal",
      foto: "",
    },
    {
      nama: "Anggota 1",
      jabatan: "Anggota Humas Internal",
      foto: "",
    },
    {
      nama: "Anggota 1",
      jabatan: "Anggota Humas Internal",
      foto: "",
    },
    {
      nama: "Anggota 1",
      jabatan: "Anggota Humas Internal",
      foto: "",
    },
    {
      nama: "Anggota 1",
      jabatan: "Anggota Humas Internal",
      foto: "",
    },
  ];

  const ProfileCard = ({ foto, nama, jabatan }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-[160px] h-[160px] mt-14">
        <div className="absolute inset-[12px] rounded-full overflow-hidden">
          <img src={foto} alt="Profil" className="w-full h-full object-cover" />
        </div>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 01182 0"
            stroke="#7B4B27"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 00182 0"
            stroke="#7B4B27"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="mt-4 flex justify-center w-[159.791px] h-[21.79px] text-[#785233] font-[Poppins] text-[25.421px] font-black leading-none tracking-[-1.017px] whitespace-nowrap text-center">
        {nama}
      </div>
      <div className="mt-2 flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] text-[14.526px] font-semibold leading-none tracking-[-0.581px] whitespace-nowrap">
        {jabatan}
      </div>
    </div>
  );

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
        DIVISI
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
          {divisiList.map((divisi, index) => (
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
                {divisi}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Kadiv */}
      <div className="relative w-[160px] h-[160px] mt-14">
        <div className="absolute inset-[12px] rounded-full overflow-hidden">
          <img
            src={kadiv.foto}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 01182 0"
            stroke="#7B4B27"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="absolute inset-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 188"
          fill="none"
        >
          <path
            d="M3 94a91 91 0 00182 0"
            stroke="#7B4B27"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="mt-4 flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] text-[25.421px] font-black leading-none tracking-[-1.017px]">
        {kadiv.nama}
      </div>
      <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] text-[14.526px] font-semibold leading-none tracking-[-0.581px]">
        {kadiv.jabatan}
      </div>

      {/* Anggota */}
      <div className="flex flex-wrap justify-center gap-16 mt-10 max-w-full mb-10">
        {anggota.map((item, i) => (
          <ProfileCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
