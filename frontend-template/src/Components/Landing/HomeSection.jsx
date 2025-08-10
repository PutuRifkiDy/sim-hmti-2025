export default function HomeSection() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col lg:flex-row items-center lg:items-center h-full">
        <div className="lg:w-1/2 w-full flex flex-col h-full lg:flex-row items-center lg:items-start p-8 lg:p-12 space-x-0 lg:space-x-4">
          <div className="mb-4 lg:mb-8 flex justify-center lg:justify-start">
            <img
              src="Logo-HMTI.png"
              alt="Logo HMTI"
              className="w-32 lg:w-56 h-auto"
            />
          </div>

          <div className="text-left flex flex-col items-center lg:items-start w-[233px]">
            <div className="relative">
              <span
                className="block text-5xl lg:text-7xl font-normal text-[#785233] leading-none"
                style={{ fontFamily: "Arrintika Signature, cursive" }}
              >
                Kabinet
              </span>
              <h1 className="uppercase text-5xl lg:text-7xl font-bold text-[#ECC067] leading-none -mt-2 lg:-mt-4 font-poppins">
                Harmoni
              </h1>
            </div>
            <p className="mt-4 lg:mt-6 text-[#785233] text-[10px] lg:text-base leading-relaxed font-bold font-poppins">
              Himpunan Mahasiswa Teknologi Informasi <br />
              Universitas Udayana
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 w-full relative">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src="gedungHMTI.png"
              alt="HMTI Udayana"
              className="w-full h-full object-cover object-center hidden lg:flex"
            />
            <img
              src="gedungHMTIMobile.png"
              alt="HMTI Udayana"
              className="w-full h-full object-cover object-center lg:hidden flex"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
