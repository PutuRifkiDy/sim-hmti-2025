import GuestLayout from '@/Layouts/GuestLayout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import HomeSection from './Home/HomeSection';
import AboutSection from './Home/AboutSection';
import ProgramKerjaSection from './Home/ProgramKerjaSection';
import FungsionarisSection from './Home/FungsionarisSection';
import OprecSection from './Home/OprecSection';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const flash_message = usePage().props.flash_message;
    const periode_active = usePage().props.periode_active;
    const program_kerja = usePage().props.program_kerja;
    const fungsionaris = usePage().props.fungsionaris;
    const oprecs = usePage().props.oprecs;
    const date_now = usePage().props.date_now;

    return (
        <>
            <div className='overflow-x-clip'>
                <HomeSection title={periode_active?.title} />
                <AboutSection youtube_link={periode_active?.youtube_link} />
                <ProgramKerjaSection program_kerja={program_kerja} />
                <FungsionarisSection cover_path={periode_active?.cover_path} fungsionaris={fungsionaris} />
                <OprecSection oprecs={oprecs} dateNow={date_now} />
            </div>
        </>
    );
}

Welcome.layout = (page) => <GuestLayout children={page} title="Selamat Datang" />;
