import React from 'react';

const fontStyles = `
  @font-face {
    font-family: 'Arrintika Signature';
    src: url('/fonts/Arinttika Signature.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

export default function ProgramKerjaSection() {
    return (
        <>
            <style>{fontStyles}</style>

            <section className="relative bg-white w-full flex items-center justify-center py-16 px-4 sm:px-8">
                
                <img src="/ornamen.png" alt="Ornament" className="absolute top-0 left-0 h-24 sm:h-32 md:h-48 z-10 transform scale-y-[-1] scale-x-[-1]" />
                <img src="/ornamen.png" alt="Ornament" className="absolute top-0 right-0 h-24 sm:h-32 md:h-48 z-10 transform scale-y-[-1]" />

                <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-20">

                    <div className="text-center mb-10">
                        <div className="relative inline-block">
                            <span 
                                className="relative block text-5xl sm:text-8xl font-normal text-[#785233] z-10" 
                                style={{ fontFamily: 'Arrintika Signature, cursive' }}>
                                Program
                            </span>
                            <h1 className="pb-0 text-5xl sm:text-8xl font-bold text-[#ECC067] mt-[-1.5rem] sm:mt-[-3rem]">
                                KERJA
                            </h1>
                        </div>
                        <p className="mt-1 text-black">Daftar Program Kerja dalam naungan Himpunan Mahasiswa Teknologi Informasi</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full">
                        
                        <a href="#" className="group relative bg-[#ECC067] p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <div className="overflow-hidden rounded-lg">
                                <img src="/pilmapres.jpg" alt="Pilmapres" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="m-1 absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                                <h3 className="text-white text-2xl font-bold mb-4">PILMAPRES-TI 2025</h3>
                            </div>
                        </a>

                        <a href="#" className="group relative bg-[#ECC067] p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <div className="overflow-hidden rounded-lg ">
                                <img src="/permikomnas.jpg" alt="Permikomnas" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300 " />
                            </div>
                            <div className="m-1 absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                                <h3 className="text-white text-2xl font-bold mb-4">PERMIKOMNAS</h3>
                            </div>
                        </a>

                        <a href="#" className="group relative bg-[#ECC067] p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <div className="overflow-hidden rounded-lg">
                                <img src="/tirta-yatra.jpg" alt="Tirta Yatra" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="m-1 absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                                <h3 className="text-white text-2xl font-bold mb-4">TIRTA YATRA</h3>
                            </div>
                        </a>

                        <a href="#" className="group relative bg-[#ECC067] p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <div className="overflow-hidden rounded-lg">
                                <img src="/seminar.jpg" alt="Seminar Nasional" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="m-1 absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                                <h3 className="text-white text-2xl font-bold mb-4">SEMINAR NASIONAL</h3>
                            </div>
                        </a>
                    </div>

                    <div className="mt-32 text-center">
                        <a href="#" className="bg-[#ECBB4E] hover:bg-white-500 text-white font-semibold py-3 px-24 rounded-lg shadow-[0_0_19px_#ECBB4E] transition-all duration-300">
                            See All Proker →
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}