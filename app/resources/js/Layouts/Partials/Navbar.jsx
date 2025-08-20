import { ThemeSwitcher } from '@/Components/ThemeSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    ArrowRightStartOnRectangleIcon,
    Bars3BottomLeftIcon,
    Squares2X2Icon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function NavBar({ auth }) {
    const [openNav, setOpenNav] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { flash_message } = usePage().props;
    const { url } = usePage();
    const urlName = window.location.pathname;

    useEffect(() => {
        if (flash_message?.message) {
            toast[flash_message.type || 'success'](flash_message.message);
        }
    }, [flash_message]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            scroll = window.scrollY;
            if (scroll > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        });
    }, [scrolled]);

    useEffect(() => {
        setOpenNav(false);
        setOpenDropdown(false);
    }, [url]);

    return (
        <>
            <nav className="fixed left-0 top-0 z-40 hidden w-full flex-row justify-between border-b-[1px] bg-white px-12 py-5 shadow dark:bg-[#1F1F1F] md:flex">
                <div>
                    <Link href={route('welcome')}>
                        <img
                            src={`${window.location.origin}/assets/icon/logo_hmti.png`}
                            alt=""
                            className="h-[49px] w-auto"
                        />
                    </Link>
                </div>
                <div className="flex flex-row items-center justify-center gap-10">
                    <Link
                        href={route('welcome')}
                        className={`group relative overflow-hidden transition-all duration-300 hover:text-[#ECBB4E] dark:hover:text-[#ECBB4E] ${route().current('welcome') ? 'text-[#ECBB4E] dark:text-[#ECBB4E]' : ''}`}
                    >
                        Home
                        <span
                            className={`absolute bottom-0 left-0 h-0.5 w-full origin-left transform bg-gradient-to-r from-[#ECBB4E]/90 to-[#ECBB4E] transition-all duration-300 ease-out ${route().current('welcome') ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 dark:from-[#ECBB4E]/90 dark:to-[#ECBB4E]`}
                        ></span>
                    </Link>

                    <Link
                        href={route('fungsionaris')}
                        className={`group relative overflow-hidden transition-all duration-300 hover:text-[#ECBB4E] dark:hover:text-[#ECBB4E] ${route().current('fungsionaris') ? 'text-[#ECBB4E] dark:text-[#ECBB4E]' : ''}`}
                    >
                        Struktur Organisasi
                        <span
                            className={`absolute bottom-0 left-0 h-0.5 w-full origin-left transform bg-gradient-to-r from-[#ECBB4E]/90 to-[#ECBB4E] transition-all duration-300 ease-out ${route().current('fungsionaris') ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 dark:from-[#ECBB4E]/90 dark:to-[#ECBB4E]`}
                        ></span>
                    </Link>

                    <Link
                        className={`group relative overflow-hidden transition-all duration-300 hover:text-[#ECBB4E] dark:hover:text-[#ECBB4E] ${route().current('program-kerja') ? 'text-[#ECBB4E] dark:text-[#ECBB4E]' : ''}`}
                        href={route('program-kerja')}
                    >
                        Program Kerja
                        <span
                            className={`absolute bottom-0 left-0 h-0.5 w-full origin-left transform bg-gradient-to-r from-[#ECBB4E]/90 to-[#ECBB4E] transition-all duration-300 ease-out ${route().current('program-kerja') ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0 dark:from-[#ECBB4E]/90 dark:to-[#ECBB4E]`}
                        ></span>
                    </Link>
                </div>

                <div className="flex flex-row items-center justify-center gap-5">
                    <div>
                        <ThemeSwitcher />
                    </div>

                    {auth ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <Avatar>
                                    {auth.img_path ? (
                                        <AvatarImage
                                            src={auth.img_path}
                                            alt={auth.name}
                                            className="w-full object-cover"
                                        />
                                    ) : (
                                        <AvatarFallback>{auth.nim.substring(0, 2)}</AvatarFallback>
                                    )}
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-12 flex w-56 flex-col justify-start gap-0 border-2 border-gray-300 outline-none dark:bg-[#101010]">
                                <DropdownMenuItem className="flex flex-row items-center gap-3 p-2 cursor-pointer">
                                    <UsersIcon className="h-10 w-10 shrink-0 text-gray-500" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[14px] leading-[110%] text-[#000000] dark:text-white">{auth.name}</p>
                                        <p className="text-[12px] leading-[110%] text-[#1F1F1F]/80 dark:text-gray-400">{auth.nim}</p>
                                    </div>
                                </DropdownMenuItem>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                                <DropdownMenuItem className="p-2 cursor-pointer" asChild>
                                    <Link href={route('profile.edit')} className="flex flex-row items-center gap-2">
                                        <Squares2X2Icon className="h-6 w-6 text-gray-500" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <div className="h-[1px] w-full bg-gray-300"></div>
                                <DropdownMenuItem className="p-2 cursor-pointer " asChild>
                                    <Link
                                        href={route('logout')}
                                        className="flex flex-row items-center gap-2 text-red-500 "
                                        type="button"
                                        method="post"
                                    >
                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-red-500" />
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild variant="gold" size="lg" className="shadow-[0_0_15px_#ECBB4E]">
                            <Link href={route('login')}>Login</Link>
                        </Button>
                    )}
                </div>
            </nav>

            <nav className="fixed left-0 top-0 z-40 flex w-full flex-col justify-between border-b-[1px] bg-white py-5 shadow dark:bg-[#1F1F1F] md:hidden">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center gap-5">
                        <Bars3BottomLeftIcon
                            className={`mx-5 h-6 w-6 shrink-0 cursor-pointer text-gray-600 dark:text-white ${openNav ? 'hidden' : 'flex'}`}
                            onClick={() => setOpenNav(!openNav)}
                        />
                        <XMarkIcon
                            className={`mx-5 h-6 w-6 shrink-0 transform cursor-pointer text-gray-600 transition-transform dark:text-white ${openNav ? 'flex rotate-180' : 'hidden'}`}
                            onClick={() => setOpenNav(!openNav)}
                        />
                        <div>
                            <Link href={route('welcome')}>
                                <img
                                    src={`${window.location.origin}/assets/icon/logo_hmti.png`}
                                    alt=""
                                    className="h-[49px] w-auto"
                                />
                            </Link>
                        </div>
                    </div>
                    {/* <SunIcon className="w-6 h-6 text-yellow-200 mx-5" /> */}
                    <div>
                        <ThemeSwitcher />
                    </div>
                </div>
                {openNav == true && (
                    <div className="mt-10">
                        <div className="flex flex-col justify-start gap-5 px-5">
                            <Link href={route('welcome')}>Home</Link>

                            <Link
                                href={route('fungsionaris')}
                            >
                                Struktur Organisasi
                            </Link>
                            <Link
                                href={route('program-kerja')}
                            >
                                Program Kerja
                            </Link>
                        </div>

                        <div className="flex flex-row justify-start gap-5 px-5 pt-5">
                            {auth ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="cursor-pointer">
                                        <Avatar>
                                            {auth.img_path ? (
                                                <AvatarImage
                                                    src={auth.img_path}
                                                    alt={auth.name}
                                                    className="w-full object-cover"
                                                />
                                            ) : (
                                                <AvatarFallback>{auth.nim.substring(0, 2)}</AvatarFallback>
                                            )}
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mr-12 flex w-56 flex-col justify-start gap-0 border-2 border-gray-300 outline-none dark:bg-[#101010]">
                                        <DropdownMenuItem className="flex flex-row items-center gap-3 p-2">
                                            <UsersIcon className="h-10 w-10 shrink-0 text-gray-500" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[14px] leading-[110%] text-[#7F7F7F]">{auth.name}</p>
                                                <p className="text-[12px] leading-[110%] text-[#ACACAC]">{auth.nim}</p>
                                            </div>
                                        </DropdownMenuItem>
                                        <div className="h-[1px] w-full bg-gray-300"></div>
                                        <DropdownMenuItem className="p-2">
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex flex-row items-center gap-2"
                                            >
                                                <Squares2X2Icon className="h-6 w-6 text-gray-500" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <div className="h-[1px] w-full bg-gray-300"></div>
                                        <DropdownMenuItem className="p-2">
                                            <Link
                                                href={route('logout')}
                                                className="flex flex-row items-center gap-2 text-red-500"
                                                type="button"
                                                method="post"
                                            >
                                                <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-red-500" />
                                                Logout
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button asChild variant="gold" size="lg" className="shadow-[0_0_15px_#ECBB4E]">
                                    <Link href={route('login')}>Login</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
