import DashboardLayout from "@/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import AnggaranDasar from "./Partials/AnggaranDasar";
import AnggaranRumahTangga from "./Partials/AnggaranRumahTangga";
import AgendaKhusus from "./Partials/AgendaKhusus";

export default function Index() {
    const ad_art = usePage().props.ad_art;
    const [tabActive, setTabActive] = useState(0);
    console.log("Index ADART", ad_art);
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between">
                    <div className="flex flex-row gap-10">
                        <div className={`cursor-pointer ${tabActive == 0 ? "text-[#ECBB4E] border-b-[7px] rounded-b-md border-[#ECBB4E]" : "" }      `} onClick={() => setTabActive(0)}>
                            <p>Anggaran Dasar</p>
                        </div>
                        <div className={`cursor-pointer ${tabActive == 1 ? "text-[#ECBB4E] border-b-[7px] rounded-b-md border-[#ECBB4E]" : "" }      `} onClick={() => setTabActive(1)}>
                            <p>Anggaran Rumah Tangga</p>
                        </div>
                        <div className={`cursor-pointer ${tabActive == 2 ? "text-[#ECBB4E] border-b-[7px] rounded-b-md border-[#ECBB4E]" : "" }      `} onClick={() => setTabActive(2)}>
                            <p>Agenda Khusus</p>
                        </div>
                    </div>

                    {tabActive == 0 && (
                        <AnggaranDasar anggaran_dasar={ad_art.anggaran_dasar}/>
                    )}

                    {tabActive == 1 && (
                        <AnggaranRumahTangga anggaran_rumah_tangga={ad_art.anggaran_rumah_tangga}/>
                    )}

                    {tabActive == 2 && (
                        <AgendaKhusus agenda_khusus={ad_art.agenda_khusus}/>
                    )}

                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <DashboardLayout children={page} title={"ADART"} header={"ADART"} description={"Lihat ADART di periode ini"} />;
