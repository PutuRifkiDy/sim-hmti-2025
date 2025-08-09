export default function HomeSection() {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="flex flex-col md:flex-row items-center md:items-center h-full">
        <div className="md:w-1/2 w-full flex flex-col md:flex-row items-center md:items-start p-8 md:p-12 space-x-0 md:space-x-4">
          <div className="mb-4 md:mb-8 flex justify-center md:justify-start">
            <img
              src="Logo-HMTI.png"
              alt="Logo HMTI"
              className="w-32 md:w-72 h-auto"
            />
          </div>

          <div className="text-left flex flex-col items-center md:items-start w-[233px]">
            <div className="relative">
              <span
                className="block text-5xl md:text-6xl lg:text-7xl font-normal text-[#785233] leading-none"
                style={{ fontFamily: "Arrintika Signature, cursive" }}
              >
                Kabinet
              </span>
              <h1 className="uppercase text-5xl md:text-6xl lg:text-7xl font-bold text-[#ECC067] leading-none -mt-2 md:-mt-4 font-poppins">
                Harmoni
              </h1>
            </div>
            <p className="mt-4 md:mt-6 text-[#785233] text-[10px] md:text-base leading-relaxed font-bold font-poppins">
              Himpunan Mahasiswa Teknologi Informasi <br />
              Universitas Udayana
            </p>
          </div>
        </div>

        <div className="md:w-1/2 w-full relative">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src="gedungHMTI.png"
              alt="Gedung HMTI"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
