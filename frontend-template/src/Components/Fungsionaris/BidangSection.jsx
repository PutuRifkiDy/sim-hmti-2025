import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function BidangSection() {
  const bidangList = [
    "KOMINFO",
    "ILMIAH",
    "BURSA",
    "MIKAT",
    "SARPRAS",
    "ROHANI",
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const kabid = {
    nama: "Indri Anisa",
    jabatan: "Kabid Kominfo",
    foto: "/Indri.jpg",
  };

  const kadiv = [
    {
      nama: "Krishna",
      jabatan: "Kadiv Humas Internal",
      foto: "/Krisnha.jpg",
    },
    {
      nama: "Devina",
      jabatan: "Kadiv Humas Eksternal",
      foto: "/Devina.jpg",
    },
    {
      nama: "Candra",
      jabatan: "Kadiv IT",
      foto: "/Candra.jpg",
    },
    {
      nama: "Ari",
      jabatan: "Kadiv Pubdok",
      foto: "/Ari.jpg",
    },
    {
      nama: "Alexa",
      jabatan: "Kadiv SKP",
      foto: "/Alexa.jpg",
    },
  ];

  const ProfileCard = ({ foto, nama, jabatan }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-[69px] h-[69px] sm:w-[160px] sm:h-[160px] mt-6 sm:mt-14">
        <div className="absolute inset-[5px] sm:inset-[12px] rounded-full overflow-hidden">
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
      <div className="mt-4 flex justify-center w-[159.791px] h-[21.79px] text-[#785233] font-[Poppins] font-black leading-none tracking-[-1.017px] whitespace-nowrap text-center text-[clamp(1rem,4vw,25px)]">
        {nama}
      </div>
      <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] font-semibold leading-none tracking-[-0.581px] text-[clamp(0.75rem,3vw,14.5px)]">
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
                      : "text-[#ecc067] border border-[#ecc067] shadow-[0_0_6px_#ecc067] hover:bg-[#ecc067] hover:text-white hover:shadow-[0_0_10px_#ecc067]"
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
      {/* Kabid */}
      <div className="relative w-[69px] h-[69px] sm:w-[160px] sm:h-[160px] mt-6 sm:mt-14">
        <div className="absolute inset-[5px] sm:inset-[12px] rounded-full overflow-hidden">
          <img
            src={kabid.foto}
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

      <div className="mt-4 flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] font-black leading-none tracking-[-1.017px] whitespace-nowrap text-[clamp(1rem,4vw,25px)]">
        {kabid.nama}
      </div>
      <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center font-[Poppins] font-semibold leading-none tracking-[-0.581px] text-[clamp(0.75rem,3vw,14.5px)]">
        {kabid.jabatan}
      </div>

      {/* Kadiv */}
      {/* Mobile Kadiv Section */}
      <div className="mt-10 w-full">
        <div className="flex flex-col items-center gap-6 sm:hidden">
          <div className="flex gap-6">
            <ProfileCard {...kadiv[0]} />
            <ProfileCard {...kadiv[1]} />
          </div>
          <div className="flex gap-6">
            <ProfileCard {...kadiv[2]} />
            <ProfileCard {...kadiv[3]} />
          </div>
          {kadiv[4] && <ProfileCard {...kadiv[4]} />}
        </div>

        <div className="hidden sm:flex flex-wrap justify-center gap-16 max-w-full">
          {kadiv.map((item, i) => (
            <ProfileCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
