export default function AgendaKhusus(agenda_khusus) {
    console.log(agenda_khusus);
    return (
        <>
            <iframe
                className="w-full h-screen"
                src={agenda_khusus.agenda_khusus ? `${agenda_khusus.agenda_khusus}` : 'assets/icon/default_image_profile.png'}
                allow="autoplay">
            </iframe>
        </>
    );
}
