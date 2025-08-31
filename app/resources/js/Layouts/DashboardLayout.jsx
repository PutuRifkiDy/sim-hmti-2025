import { IconChart, IconOpenRekrutmen, IconProfileSideBar } from '@/Components/IconAdmin';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from './Partials/Sidebar';

export default function DashboardLayout({ children, title, header, description }) {
	const auth = usePage().props.auth.user;
	const route_sidebar = [
		...(auth.is_divisi_it
			? [
					// semua dia bisa akses
					// {
					//     icon: <IconBerandaSideBar />,
					//     text: "Beranda",
					//     link: route("dashboard"),
					// },
					{
						icon: <IconProfileSideBar />,
						text: 'Profil',
						link: route('profile.edit'),
					},
					{
						icon: <IconOpenRekrutmen />,
						text: 'Open Recruitment',
						link: route('oprec-regist.index'),
					},
					{
						icon: <DocumentIcon className="h-[22px] w-[22px]" />,
						text: 'AD/ART',
						link: route('master-adart.index'),
					},
					{
						icon: <IconChart className="h-[22px] w-[22px]" />,
						text: 'Grafik Keuangan',
						link: route('master-grafik.index'),
					},
				]
			: auth.is_ketua_kegiatan
				? [
						// {
						//     icon: <IconBerandaSideBar />,
						//     text: "Beranda",
						//     link: route("dashboard"),
						// },
						{
							icon: <IconProfileSideBar />,
							text: 'Profil',
							link: route('profile.edit'),
						},
						{
							icon: <IconOpenRekrutmen />,
							text: 'Open Recruitment',
							link: route('oprec-regist.index'),
						},
						{
							icon: <DocumentIcon className="h-[22px] w-[22px]" />,
							text: 'AD/ART',
							link: route('master-adart.index'),
						},
					]
				: [
						// {
						//     icon: <IconBerandaSideBar />,
						//     text: "Beranda",
						//     link: route("dashboard"),
						// },
						{
							icon: <IconProfileSideBar />,
							text: 'Profil',
							link: route('profile.edit'),
						},
						{
							icon: <IconOpenRekrutmen />,
							text: 'Open Recruitment',
							link: route('oprec-regist.index'),
						},
						{
							icon: <DocumentIcon className="h-[22px] w-[22px]" />,
							text: 'AD/ART',
							link: route('master-adart.index'),
						},
					]),
	];

	return (
		<>
			<Head title={title} />
			<Sidebar navigations={route_sidebar} header={header} description={description}>
				{children}
			</Sidebar>
		</>
	);
}
