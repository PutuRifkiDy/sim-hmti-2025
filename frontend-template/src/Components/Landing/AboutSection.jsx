export default function AboutSection() {
  return (
    <div
      className="bg-[url('bg-about.jpg')] bg-cover w-full h-full relative flex-shrink-0 bg-no-repeat aspect-[97/65]
       min-h-[800px]"
    >
      <div className="flex flex-col md:flex-row items-center md:items-center h-full justify-between pb-24 mx-4">
        <div className="md:w-1/2 w-full flex flex-col md:flex-row items-center md:items-start p-8 md:p-12 space-x-0 md:space-x-4">
          <div className="text-left flex flex-col items-center md:items-start">
            <div className="relative">
              <span
                className="block text-5xl md:text-7xl lg:text-7xl font-normal text-[#785233] leading-none"
                style={{ fontFamily: "Arrintika Signature, cursive" }}
              >
                About
              </span>
              <h1 className="uppercase text-5xl md:text-7xl lg:text-7xl font-bold text-[#ECC067] leading-none -mt-2 md:-mt-4 font-poppins">
                HMTI
              </h1>
            </div>
            <p className="mt-4 md:mt-6 text-black md:text-2xl text-base leading-relaxed font-poppins">
              Himpunan Mahasiswa Teknologi Informasi atau biasa disebut HMTI
              merupakan organisasi kemahasiswaan di lingkungan Program Studi
              Teknologi Informasi, Fakultas Teknik, Universitas Udayana. <br />{" "} <br />
              HMTI berfungsi sebagai sarana untuk menampung dan
              menyalurkanaspirasi mahasiswa Teknologi Informasi, dan juga
              sebagai wadah mahasiswa untuk melatih diri dalam berorganisasi dan
              memimpin.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 mx-6 md:mx-0 w-full relative flex justify-center">
          <div className="w-full max-w-[420px] h-auto relative overflow-hidden flex justify-center">
            <iframe
              src="https://www.youtube.com/embed/HWszrBXn53c?si=l1wzcn0pSP8NjYuc"
              className="w-full h-auto aspect-video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
