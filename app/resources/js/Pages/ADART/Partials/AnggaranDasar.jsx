export default function AnggaranDasar(anggaran_dasar) {
    return (
        <>
            <iframe
                className="w-full h-screen"
                src={anggaran_dasar.anggaran_dasar ? `${anggaran_dasar.anggaran_dasar}` : 'assets/icon/default_image_profile.png'}
                allow="autoplay">
            </iframe>
        </>
    );
}
