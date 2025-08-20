import { Button } from "@/Components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import * as AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProgramKerjaSection({ program_kerja }) {

    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (card) => {
        setHoveredCard(card);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: 'ease-out-cubic',
            offset: 100,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });

        setTimeout(() => {
            AOS.refreshHard();
        }, 500);
    }, []);

    return (
        <>

            <section className="relative bg-white w-full flex items-center justify-center py-16 px-4 sm:px-8 dark:bg-[#1f1f1f]">

                <img src="/assets/icon/hiasan_left_footer.png" alt="Ornament" className="absolute top-0 left-0 h-24 sm:h-32 md:h-48 z-10 transform rotate-90" />
                <img src="/assets/icon/hiasan_right_footer.png" alt="Ornament" className="absolute top-0 right-0 h-24 sm:h-32 md:h-48 z-10 transform -rotate-90" />

                <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-20">

                    <div className="text-center mb-10">
                        <div className="relative inline-block">
                            <span
                                className="relative block text-5xl sm:text-8xl font-normal text-[#785233] z-10"
                                data-aos="fade-up"
                                data-aos-duration="600"
                                style={{ fontFamily: 'Arrintika Signature, cursive' }}>
                                Program
                            </span>
                            <h1
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                className="pb-0 text-5xl sm:text-8xl font-bold text-[#ECC067] mt-[-1.5rem] sm:mt-[-3rem]">
                                KERJA
                            </h1>
                        </div>
                        <p
                            data-aos="fade-up"
                            data-aos-duration="1500"
                            className="mt-1 text-black dark:text-white">Daftar Program Kerja dalam naungan Himpunan Mahasiswa Teknologi Informasi</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full" data-aos="fade-up" data-aos-duration="600">
                        {program_kerja.map((kerja, index) => (
                            <div
                                className={`relative aspect-[414/233] rounded-lg overflow-hidden cursor-pointer shadow-md w-full max-w-[414px] mx-auto border-2 border-[#E4B45C] group hover:-translate-y-2 transition-all duration-500 ease-in-out`}
                                onMouseEnter={() => handleMouseEnter(kerja)}
                                onMouseLeave={handleMouseLeave}
                                key={index}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${kerja.img_path}')` }}
                                />
                                <div
                                    className={`absolute inset-0 flex items-end p-4 transition-opacity duration-300 ${hoveredCard == kerja ? "opacity-0" : "md:group-hover:opacity-0"
                                        }`}
                                >
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-bold text-center w-full tracking-wide">
                                        {kerja.title}
                                    </h3>
                                </div>
                                <div
                                    className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-300 ${hoveredCard == kerja ? "opacity-100 " : "opacity-0 md:group-hover:opacity-100"
                                        }`}
                                >
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-2">
                                        {kerja.title}
                                    </h3>
                                    <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed">
                                        {kerja.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {/* <div className="group relative bg-[#ECC067] p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300" key={index}>
                            <div className="overflow-hidden rounded-lg">
                                <img src={kerja.img_path} alt={kerja.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="m-1 absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent rounded-xl">
                                <h3 className="text-white text-2xl font-bold mb-4">{kerja.title}</h3>
                            </div>
                        </div> */}

                    </div>

                    <div className="md:mt-32 mt-10 text-center">
                        <Button
                            data-aos="fade-up"
                            data-aos-duration="600"
                            variant="gold"
                            type="button" asChild
                            className="shadow-[0_0_15px_#ECBB4E] px-16 py-5 animate-bounce transition-all duration-1000 ease-in-out">
                            <Link
                                className="group"
                                href={route('program-kerja')}
                            >
                                Lihat Semua Program Kerja
                                <ArrowRightIcon className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
