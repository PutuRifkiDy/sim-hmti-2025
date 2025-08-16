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
			<div className="flex h-[100vh] flex-col">{children}</div>
			<Footer />
		</>
	);
}
