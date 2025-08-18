import React from 'react';

const TitleProgramKerjaSection = () => {
  return (
    <div className="text-center mt-10 mb-6 sm:mb-20">
      <div className="relative inline-block h-[70px] md:h-[120px]">
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 text-[38px] md:text-[78px] leading-none text-[#8B5E3C]"
          style={{ fontFamily: 'Arinttika Signature Demo' }}
        >
          Program
        </span>
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 text-[52px] md:text-[88px] font-extrabold text-[#E4B45C] leading-none font-poppins"
        >
          KERJA
        </span>
      </div>
      <p
        className="text-[10px] md:text-sm text-gray-800"
        style={{ fontFamily: 'Rubik' }}
      >
        Daftar Program Kerja dalam naungan
        <br className="md:hidden" />
        <span className="hidden md:inline"> </span>
        Himpunan Mahasiswa Teknologi Informasi
      </p>
    </div>
  );
};

export default TitleProgramKerjaSection;
