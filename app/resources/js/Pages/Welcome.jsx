import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const flash_message = usePage().props.flash_message;
    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    return (
        <>
            <p>Ini adalah welcome</p>
        </>
    );
}

Welcome.layout = (page) => <GuestLayout children={page} title="Welcome" />;
