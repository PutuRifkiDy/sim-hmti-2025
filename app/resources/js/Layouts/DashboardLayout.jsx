import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from './Partials/Sidebar';
import { IconBerandaSideBar, IconProfileSideBar } from '@/Components/IconAdmin';
import { Toaster } from '@/Components/ui/sonner';

export default function DashboardLayout({ children, title, header, description }) {
    const route_sidebar = [
        {
            icon: <IconBerandaSideBar />,
            text: "Beranda",
            link: route("dashboard"),
        },
        {
            icon: <IconProfileSideBar />,
            text: "Profil",
            link: route('profile.edit'),
        },
        {
            icon: <IconProfileSideBar />,
            text: "Master User",
            link: route('master-user.index'),
        },
        {
            icon: <IconProfileSideBar />,
            text: "Master Sie",
            link: route('master-sie.index'),
        }
    ];

    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />
            <Sidebar navigations={route_sidebar} header={header} description={description}>
                {children}
            </Sidebar>
        </>
    );
}
