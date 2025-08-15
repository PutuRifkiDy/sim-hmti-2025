import DashboardLayout from "@/Layouts/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import AnggaranDasar from "./Partials/AnggaranDasar";
import AnggaranRumahTangga from "./Partials/AnggaranRumahTangga";
import AgendaKhusus from "./Partials/AgendaKhusus";

export default function Index() {
    const ad_art = usePage().props.ad_art;
    const [tabActive, setTabActive] = useState(0);

    console.log(ad_art);
    return (
        <>
            <div className="py-5">
                <div className="bg-white dark:bg-[#040529] p-4 shadow rounded-lg sm:p-8 flex flex-col gap-5 justify-between space-y-2">
                    <div className="flex flex-row gap-10">
                        <div className={`cursor-pointer relative ${tabActive == 0 ? "text-[#ECBB4E] " : ""}      `} onClick={() => setTabActive(0)}>
                            <p>Anggaran Dasar</p>
                            {tabActive == 0 &&
                                <span className="absolute h-1.5 w-full rounded-top-md  rounded-t-md bg-[#ECBB4E]"></span>
                            }
                        </div>
                        <div className={`cursor-pointer relative ${tabActive == 1 ? "text-[#ECBB4E] " : ""}      `} onClick={() => setTabActive(1)}>
                            <p>Anggaran Rumah Tangga</p>
                            {tabActive == 1 &&
                                <span className="absolute h-1.5 w-full rounded-top-md  rounded-t-md bg-[#ECBB4E]"></span>
                            }                        </div>
                        <div className={`cursor-pointer relative ${tabActive == 2 ? "text-[#ECBB4E] " : ""}      `} onClick={() => setTabActive(2)}>
                            <p>Agenda Khusus</p>
                            {tabActive == 2 &&
                                <span className="absolute h-1.5 w-full rounded-top-md  rounded-t-md bg-[#ECBB4E]"></span>
                            }
                        </div>
                    </div>

                    {tabActive == 0 && (
                        <AnggaranDasar anggaran_dasar={ad_art.anggaran_dasar} />
                    )}

                    {tabActive == 1 && (
                        <AnggaranRumahTangga anggaran_rumah_tangga={ad_art.anggaran_rumah_tangga} />
                    )}

                    {tabActive == 2 && (
                        <AgendaKhusus agenda_khusus={ad_art.agenda_khusus} />
                    )}

                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <DashboardLayout children={page} title={"ADART"} header={"ADART"} description={"Lihat ADART di periode ini"} />;
