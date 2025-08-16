import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Dashboard() {
	const flash_message = usePage().props.flash_message;
	useEffect(() => {
		if (flash_message?.message) {
			toast[flash_message.type || 'success'](flash_message.message);
		}
	}, [flash_message]);
	return <div className="py-12"></div>;
}

Dashboard.layout = (page) => (
	<DashboardLayout
		children={page}
		title={'Dashboard'}
		header={'Dashboard'}
		description={'Kelola dashboard anda di page ini'}
	/>
);
