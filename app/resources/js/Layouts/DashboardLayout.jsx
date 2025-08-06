import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from './Partials/Sidebar';
import { IconBerandaSideBar, IconChart, IconOpenRekrutmen, IconProfileSideBar } from '@/Components/IconAdmin';
import { Toaster } from '@/Components/ui/sonner';
import { DocumentIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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
            icon: <IconOpenRekrutmen />,
            text: "Open Rekruitmen",
            link: route('oprec-regist.index'),
        },
        {
            icon: <DocumentIcon className='w-[22px] h-[22px]' />,
            text: "AD/ART",
            link: route('master-adart.index'),
        },
        {
            icon: <IconChart className='w-[22px] h-[22px]' />,
            text: "Grafik Keuangan",
            link: route('master-grafik.index'),
        }
        // {
        //     icon: <IconProfileSideBar />,
        //     text: "Master User",
        //     link: route('master-user.index'),
        // },
        // {
        //     icon: <IconProfileSideBar />,
        //     text: "Master Sie",
        //     link: route('master-sie.index'),
        // },
        // {
        //     icon: <IconProfileSideBar />,
        //     text: "Master Periode",
        //     link: route('master-period.index'),
        // },
        // {
        //     icon: <IconProfileSideBar />,
        //     text: "Master Jabatan",
        //     link: route('master-position.index'),
        // },
        // {
        //     icon: <IconProfileSideBar />,
        //     text: "Master Oprec",
        //     link: route('master-open-rekruitmen.index'),
        // },

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
