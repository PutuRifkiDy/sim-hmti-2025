import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from './Partials/Sidebar';
import { IconBerandaSideBar, IconProfileSideBar } from '@/Components/IconAdmin';
import { Toaster } from '@/Components/ui/sonner';

export default function DashboardLayout({ children, title }) {
    const route_sidebar = [
        {
            icon: <IconBerandaSideBar />,
            text: "Dashboard",
            link: route("dashboard"),
        },
        {
            icon: <IconProfileSideBar />,
            text: "Profile",
            link: route('profile.edit'),
        }
    ];

    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />
            <Sidebar navigations={route_sidebar}>
                {children}
            </Sidebar>
        </>
    );
}
