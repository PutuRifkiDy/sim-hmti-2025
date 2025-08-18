import { Toaster } from '@/Components/ui/sonner';
import { Head, usePage } from '@inertiajs/react';
import Footer from './Partials/Footer';
import NavBar from './Partials/Navbar';

export default function GuestLayout({ children, title }) {
    const auth = usePage().props.auth.user;
    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />
            <NavBar auth={auth} />
            <div className="flex flex-col md:py-5 py-24">
                {children}
            </div>
            <Footer />
        </>
    );
}
