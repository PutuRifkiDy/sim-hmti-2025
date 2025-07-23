import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import { use, useEffect } from 'react';
import { toast } from 'sonner';

export default function Dashboard() {
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);
    return (
        <DashboardLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}>
            <Head title="Profile" />

            <div className="py-12">

            </div>
        </DashboardLayout>
    );
}
