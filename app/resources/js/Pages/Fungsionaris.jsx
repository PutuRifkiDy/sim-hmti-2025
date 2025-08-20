import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import TitleFungsionarisSection from "./Fungsionaris/TitleFungsionarisSection";
import IntiSection from "./Fungsionaris/IntiSection";
import BidangSection from "./Fungsionaris/BidangSection";
import DivisiSection from "./Fungsionaris/DivisiSection";
import * as AOS from 'aos';
import 'aos/dist/aos.css';

export default function Fungsionaris({ periods = [], periodActive, view }) {
    const [activeBidang, setActiveBidang] = useState(0);
    useEffect(() => setActiveBidang(0), [periodActive?.id]);

    const bidangButtons = (view?.bidang ?? []).map((b) => b.label);
    const currentBidang = view?.bidang?.[activeBidang] ?? null;

    const gotoPeriod = (id) => {
        router.get(route("fungsionaris"), { period_id: id }, { preserveScroll: true });
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
        <div className="flex flex-col gap-2 md:pb-24 pb-12">
            <TitleFungsionarisSection />

            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                {periods.map((p) => (
                    <button
                        data-aos="fade-up"
                        data-aos-duration={1 + p.id * 100}
                        key={p.id}
                        onClick={() => gotoPeriod(p.id)}
                        className={`px-4 py-2 rounded-[7.215px] border transition ${p.id == periodActive?.id
                            ? "bg-[#ecc067] text-white border-[#ecc067]"
                            : "text-[#ecc067] border-[#ecc067] hover:bg-[#ecc067] hover:text-white"
                            }`}
                    >
                        {p.title}
                    </button>
                ))}
            </div>

            <div className="flex flex-col space-y-10">
                {/* INTI */}
                <IntiSection
                    ketua={view?.inti?.ketua}
                    wakil1={view?.inti?.wakil1}
                    wakil2={view?.inti?.wakil2}
                    sekretariats={view?.inti?.sekretariats ?? []}
                    bendaharas={view?.inti?.bendaharas ?? []}
                />

                {/* BIDANG */}
                <BidangSection
                    buttons={bidangButtons}
                    activeIndex={activeBidang}
                    onChange={setActiveBidang}
                    kabidCard={currentBidang?.kabidCard}
                    kadivCards={currentBidang?.kadivCards ?? []}
                />

                {/* DIVISI*/}
                <DivisiSection groups={currentBidang?.groups ?? []} />
            </div>
        </div>
    );
}
Fungsionaris.layout = (page) => <GuestLayout children={page} title="Struktur Organisasi" />;
