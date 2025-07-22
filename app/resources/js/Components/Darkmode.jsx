import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function DarkMode({}) {
    const [theme, setThemes] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    const handleTheme = (e) => {
        if (e.target.checked) {
            setThemes('dark');
        } else {
            setThemes('light');
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const deviceTheme = localStorage.getItem('theme');

        document.querySelector('html').setAttribute('data-theme', deviceTheme);
        document.querySelector('html').setAttribute('class', deviceTheme);
    }, [theme]);

    return (
        <>
            <div className="toggle-theme cursor-pointer">
                <label className="swap swap-rotate rounded-full bg-[#42A1A4] p-2 shadow-[0_0_10px_#59DFD1]">
                    <input
                        type="checkbox"
                        onChange={handleTheme}
                        className="hidden"
                        checked={theme === 'light' ? false : true}
                    />

                    <SunIcon className="swap-on h-5 w-5 fill-current text-white dark:text-white" />

                    <MoonIcon className="swap-off h-5 w-5 fill-current text-white" />
                </label>
            </div>
        </>
    );
}
