export default function HomeSection({title}) {
    return (
        <>
            <div className="w-full bg-white dark:bg-[#1F1F1F]">
                <div className="flex flex-col lg:flex-row items-center lg:items-center h-full">
                    <div className="lg:w-1/2 w-full flex flex-col h-full lg:flex-row items-center lg:items-start p-8 lg:p-12 space-x-0 lg:space-x-4">
                        <div className="mb-4 lg:mb-8 flex justify-center lg:justify-start">
                            <img
                                src="/assets/icon/logo_hmti.png"
                                alt="Logo HMTI"
                                className="w-32 lg:w-56 h-auto"
                            />
                        </div>

                        <div className="text-left flex flex-col items-center lg:items-start">
                            <div className="relative">
                                <span
                                    className="block text-5xl lg:text-7xl font-normal text-[#785233] leading-none"
                                    style={{ fontFamily: "Arrintika Signature, cursive" }}
                                >
                                    Kabinet
                                </span>
                                <h1 className="uppercase text-5xl lg:text-7xl tracking-tighter font-extrabold text-[#ECC067] leading-none -mt-2 lg:-mt-4 font-poppins">
                                    {title}
                                </h1>
                            </div>
                            <p className="text-[#785233] text-[10px] lg:text-base leading-relaxed font-semibold md:w-[392px] w-full">
                                Himpunan Mahasiswa Teknologi Informasi <br />
                                Universitas Udayana
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full relative">
                        <div className="w-full h-full relative overflow-hidden">
                            <img
                                src="/assets/images/gedungHMTI.png"
                                alt="HMTI Udayana"
                                className="w-full h-full object-cover object-center hidden lg:block dark:hidden"
                            />

                            <img
                                src="/assets/images/gedungHMTIDark.png"
                                alt="HMTI Udayana"
                                className="w-full h-full object-cover object-center hidden lg:hidden dark:block"
                            />

                            <img
                                src="/assets/images/gedungHMTIMobile.png"
                                alt="HMTI Udayana"
                                className="w-full h-full object-cover object-center lg:hidden flex dark:hidden"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
