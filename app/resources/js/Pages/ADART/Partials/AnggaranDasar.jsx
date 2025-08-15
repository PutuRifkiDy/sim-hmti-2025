import { IconMasterNotFound } from "@/Components/IconAdmin";

export default function AnggaranDasar(anggaran_dasar) {
    return (
        <>
            <div>
                {anggaran_dasar.anggaran_dasar ? (
                    <iframe
                        className="w-full h-screen flex items-center"
                        src={anggaran_dasar.anggaran_dasar ?? `${anggaran_dasar.anggaran_dasar}`}
                        allow="autoplay">
                    </iframe>
                ) : (
                    <div className="flex flex-row gap-2 items-center justify-center w-full h-[50vh]">
                        <IconMasterNotFound width={80} height={80} />
                        <p className="text-center text-[18px] text-[#7F7F7F]">File tidak ditemukan</p>
                    </div>
                )}
            </div>
        </>
    );
}
