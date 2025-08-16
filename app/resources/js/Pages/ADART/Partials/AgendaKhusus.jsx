import { IconMasterNotFound } from "@/Components/IconAdmin";

export default function AgendaKhusus(agenda_khusus) {
    return (
        <>
            <div>
                {agenda_khusus.agenda_khusus ? (
                    <iframe
                        className="w-full h-screen flex items-center"
                        src={agenda_khusus.agenda_khusus ?? `${agenda_khusus.agenda_khusus}`}
                        allow="autoplay">
                    </iframe>
                ) : (
                    <div className="flex md:flex-row flex-col gap-2 items-center justify-center w-full h-[50vh]">
                        <IconMasterNotFound width={80} height={80} />
                        <p className="text-center text-[18px] text-[#7F7F7F]">File tidak ditemukan</p>
                    </div>
                )}
            </div>
        </>
    );
}
