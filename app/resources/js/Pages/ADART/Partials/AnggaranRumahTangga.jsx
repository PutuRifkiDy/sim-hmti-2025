export default function AnggaranRumahTangga(anggaran_rumah_tangga) {
    return (
        <>
            <iframe
                className="w-full h-screen"
                src={anggaran_rumah_tangga.anggaran_rumah_tangga ? `${anggaran_rumah_tangga.anggaran_rumah_tangga}` : 'assets/icon/default_image_profile.png'}
                allow="autoplay">
            </iframe>
        </>
    );
}
