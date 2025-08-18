import GuestLayout from "@/Layouts/GuestLayout";

export default function StrukturOrganisasi() {
    return (
        <>
            <p>ini adalah struktur organisasi</p>
        </>
    );
}

StrukturOrganisasi.layout = (page) => <GuestLayout children={page} title="Struktur Organisasi" />;
