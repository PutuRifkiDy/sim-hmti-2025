import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
	return (
        <DashboardLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}>
            <Head title="Profile" />

            <div className="py-12">
                
            </div>
        </DashboardLayout>
	);
}
