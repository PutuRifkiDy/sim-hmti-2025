import { useTheme } from '@/Components/ThemeProvider';
import { Button } from '@/Components/ui/button';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [isRotating, setIsRotating] = useState(false);

	const toggleTheme = () => {
		setIsRotating(true); // aktifkan rotasi

		if (theme === 'dark') {
			setTheme('light');
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		} else {
			setTheme('dark');
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		}

		setTimeout(() => setIsRotating(false), 500);
	};

	return (
		<Button onClick={toggleTheme} variant="none">
			<div
				className={`flex items-center gap-x-2 transition-transform duration-500 ${
					isRotating ? 'rotate-[360deg]' : ''
				}`}
			>
				{theme === 'dark' ? (
					<SunIcon className="h-7 w-7 text-yellow-400" />
				) : (
					<MoonIcon className="h-7 w-7 text-[#000000]" />
				)}
			</div>
		</Button>
	);
}
