import { Toaster } from '@/Components/ui/sonner';
import { Head, Link, usePage } from '@inertiajs/react';
import NavBar from './Partials/Navbar';
import Footer from './Partials/Footer';

export default function GuestLayout({ children, title }) {
    const auth = usePage().props.auth.user;
    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />
            <NavBar auth={auth} />
            <div className='flex flex-col h-[100vh]'>
                {children}
            </div>
            <Footer />
        </>
    );
}
