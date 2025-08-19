// resources/js/Pages/Fungsionaris/IntiSection.jsx
import React from "react";

export default function IntiSection({
    ketua = { nama: "-", jabatan: "Ketua", foto: "/placeholder-user.png" },
    wakil1 = { nama: "-", jabatan: "Wakil Ketua 1", foto: "/placeholder-user.png" },
    wakil2 = { nama: "-", jabatan: "Wakil Ketua 2", foto: "/placeholder-user.png" },
    sekretariats = [],
    bendaharas = [],
}) {
    const ProfileCard = ({ foto, nama, jabatan }) => (
        <div className="flex flex-col items-center">
            <div className="relative w-[69px] h-[69px] sm:w-[160px] sm:h-[160px] mt-6 sm:mt-14">
                <div className="absolute inset-[5px] sm:inset-[12px] rounded-full overflow-hidden">
                    <img src={foto} alt="Profil" className="w-full h-full object-cover" />
                </div>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 01182 0" stroke="#7B4B27" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <svg className="absolute inset-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" fill="none">
                    <path d="M3 94a91 91 0 00182 0" stroke="#7B4B27" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
                </svg>
            </div>
            <div className="mt-4 flex justify-center w-[159.791px] h-[21.79px] text-[#785233]  font-black leading-none tracking-[-1.017px] whitespace-nowrap text-center text-[clamp(1rem,4vw,25px)]">
                {nama}
            </div>
            <div className="flex flex-col justify-center w-[159.791px] h-[21.79px] text-[#785233] text-center  font-semibold leading-none tracking-[-0.581px] text-[clamp(0.75rem,3vw,14.5px)]">
                {jabatan}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center text-center pt-[5%] sm:pt-[6%] md:pt-[7%] lg:pt-[8%] w-full max-w-[95%] mx-auto px-4">
            {/* JUDUL */}
            <h1
            data-aos="fade-up" data-aos-duration="600"
            className="text-[#ecc067] font-poppins font-black leading-[1.1] tracking-[-0.06em] uppercase text-[clamp(2rem,6vw,5.5rem)] -mt-[0.5em]">
                INTI
            </h1>

            {/* Ketua */}
            <ProfileCard {...ketua}/>

            {/* Wakil-wakil */}
            <div className="mt-10 w-full grid grid-cols-2 gap-6 max-w-3xl">
                <ProfileCard {...wakil1} />
                <ProfileCard {...wakil2}/>
            </div>

            {/* Sekretaris & Bendahara*/}
            <div className="mt-10 w-full grid grid-cols-2 gap-6 max-w-5xl">
                <div className="flex flex-wrap justify-center gap-8">
                    {sekretariats.map((p, i) => (
                        <ProfileCard key={`sek-${i}`} {...p} />
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {bendaharas.map((p, i) => (
                        <ProfileCard key={`ben-${i}`} {...p} />
                    ))}
                </div>
            </div>
        </div>
    );
}
