import { Link, usePage } from "@inertiajs/react";
import DarkMode from "@/Components/DarkMode";
import { ChevronDownIcon, UserCircleIcon, Bars3Icon, XMarkIcon, ArrowRightStartOnRectangleIcon, Squares2X2Icon, Bars3BottomLeftIcon, SunIcon, UserIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import { check } from "prettier";
import { ThemeSwitcher } from "@/Components/ThemeSwitcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

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
        window.addEventListener("scroll", () => {
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
            <nav className="md:flex hidden flex-row justify-between py-5 px-12 border-b-[1px] fixed top-0 left-0 w-full z-50 shadow bg-white dark:bg-[#1F1F1F]">
                <div>
                    <Link
                        href={route('welcome')}
                    >
                        <img src={`${window.location.origin}/assets/icon/logo_hmti.png`} alt="" className="w-auto h-[49px]" />
                    </Link>
                </div>
                <div className="flex flex-row gap-10 justify-center items-center">
                    <Link
                        href={route('welcome')}
                        className={`relative transition-all duration-300 overflow-hidden hover:text-[#ECBB4E] dark:hover:text-[#ECBB4E] group ${route().current('welcome') ? 'text-[#ECBB4E] dark:text-[#ECBB4E]' : ''}`}
                    >
                        Home
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ECBB4E]/90 to-[#ECBB4E]
                            transform origin-left transition-all duration-300 ease-out
                            ${route().current('welcome') ? 'translate-x-0' : '-translate-x-full'}
                            group-hover:translate-x-0 dark:from-[#ECBB4E]/90 dark:to-[#ECBB4E]`}>
                        </span>
                    </Link>

                    <Link
                        className={`relative transition-all duration-300 overflow-hidden hover:text-[#ECBB4E] dark:hover:text-[#ECBB4E] group ${route().current('event.front.show') ? 'text-[#ECBB4E] dark:text-[#ECBB4E]' : ''}`}
                    >
                        Open Recruitmen
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ECBB4E]/90 to-[#ECBB4E]
                            transform origin-left transition-all duration-300 ease-out
                            ${route().current('event.front.show') ? 'translate-x-0' : '-translate-x-full'}
                            group-hover:translate-x-0 dark:from-[#ECBB4E]/90 dark:to-[#ECBB4E]`}>
                        </span>
                    </Link>

                    <Link
                        className={`relative transition-all duration-300 overflow-hidden hover:text-[#ECBB4E] dark:hover:text-[#ECBB4E] group ${route().current('merchandise.front.show') ? 'text-[#ECBB4E] dark:text-[#ECBB4E]' : ''}`}
                    >
                        Struktur Organisasi
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ECBB4E]/90 to-[#ECBB4E]
                            transform origin-left transition-all duration-300 ease-out
                            ${route().current('merchandise.front.show') ? 'translate-x-0' : '-translate-x-full'}
                            group-hover:translate-x-0 dark:from-[#ECBB4E]/90 dark:to-[#ECBB4E]`}>
                        </span>
                    </Link>

                    <Link
                        className={`relative transition-all duration-300 overflow-hidden hover:text-[#ECBB4E] dark:hover:text-[#ECBB4E] group ${route().current('merchandise.front.show') ? 'text-[#ECBB4E] dark:text-[#ECBB4E]' : ''}`}
                    >
                        Program Kerja
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ECBB4E]/90 to-[#ECBB4E]
                            transform origin-left transition-all duration-300 ease-out
                            ${route().current('merchandise.front.show') ? 'translate-x-0' : '-translate-x-full'}
                            group-hover:translate-x-0 dark:from-[#ECBB4E]/90 dark:to-[#ECBB4E]`}>
                        </span>
                    </Link>
                </div>

                <div className="flex flex-row gap-5 justify-center items-center">
                    <div>
                        <ThemeSwitcher />
                    </div>

                    {auth ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <Avatar>
                                    {auth.img_path ? (
                                        <AvatarImage src={auth.img_path} alt={auth.name} className="object-cover w-full" />
                                    ) : (
                                        <AvatarFallback>{auth.nim.substring(0, 2)}</AvatarFallback>
                                    )}
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 flex flex-col justify-start gap-0 outline-none mr-12 dark:bg-[#101010] border-2 border-gray-300" >
                                <DropdownMenuItem className="flex flex-row gap-3 items-center p-2">
                                    <UsersIcon className="h-10 w-10 text-gray-500 shrink-0" />
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[14px] text-[#7F7F7F] leading-[110%]">{auth.name}</p>
                                        <p className="text-[12px] text-[#ACACAC] leading-[110%]">{auth.nim}</p>
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
                                        className="text-red-500 flex flex-row items-center gap-2"
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
                            <Link
                                href={route('login')}
                            >
                                Login
                            </Link>
                        </Button>
                    )}
                </div>
            </nav>

            <nav className="md:hidden flex flex-col justify-between py-5 border-b-[1px] fixed top-0 left-0 w-full z-50 shadow bg-white dark:bg-[#1F1F1F]">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-5 items-center">
                        <Bars3BottomLeftIcon className={`w-6 h-6 text-gray-600 mx-5 cursor-pointer dark:text-white shrink-0 ${openNav ? 'hidden' : 'flex'}`} onClick={() => setOpenNav(!openNav)} />
                        <XMarkIcon className={`w-6 h-6 text-gray-600 mx-5 cursor-pointer transition-transform transform shrink-0 dark:text-white ${openNav ? 'flex rotate-180' : 'hidden'}`} onClick={() => setOpenNav(!openNav)} />
                        <div>
                            <Link
                                href={route('welcome')}
                            >
                                <img src={`${window.location.origin}/assets/icon/logo_hmti.png`} alt="" className="w-auto h-[49px]" />
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
                        <div className="flex flex-col gap-5 justify-start px-5">
                            <Link
                                href={route('welcome')}
                            >
                                Home
                            </Link>

                            <Link
                                // href={route('event.front.show', ['seminar-nasional-teknologi-informasi-of'])}
                                className="truncate"
                            >
                                Open Recruitmen
                            </Link>

                            <Link
                            // href={route('merchandise.front.show')}
                            >
                                Struktur Organisasi
                            </Link>
                            <Link
                            // href={route('merchandise.front.show')}
                            >
                                Program Kerja
                            </Link>
                        </div>

                        <div className="flex flex-row gap-5 px-5 pt-5 justify-start">
                            {auth ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="cursor-pointer">
                                        <Avatar>
                                            {auth.img_path ? (
                                                <AvatarImage src={auth.img_path} alt={auth.name} className="object-cover w-full" />
                                            ) : (
                                                <AvatarFallback>{auth.nim.substring(0, 2)}</AvatarFallback>
                                            )}
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 flex flex-col justify-start gap-0 outline-none mr-12 dark:bg-[#101010] border-2 border-gray-300" >
                                        <DropdownMenuItem className="flex flex-row gap-3 items-center p-2">
                                            <UsersIcon className="h-10 w-10 text-gray-500 shrink-0" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[14px] text-[#7F7F7F] leading-[110%]">{auth.name}</p>
                                                <p className="text-[12px] text-[#ACACAC] leading-[110%]">{auth.nim}</p>
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
                                                className="text-red-500 flex flex-row items-center gap-2"
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
                                    <Link
                                        href={route('login')}
                                    >
                                        Login
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

        </>
    );
}
