import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from './Partials/Sidebar';
import { IconBerandaSideBar, IconProfileSideBar } from '@/Components/IconAdmin';

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
            <Sidebar navigations={route_sidebar}>
                {children}
            </Sidebar>
        </>
    );
}
