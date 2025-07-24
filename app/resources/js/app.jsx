import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from './Components/ThemeProvider';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const appName = import.meta.env.VITE_APP_NAME || 'HMTI-2025';


const AppWrapper = ({ App, props }) => {

    return (
        <ThemeProvider defaultTheme="light" storageKey="current-theme">
            <App {...props} />
        </ThemeProvider>
    );
};


createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
	setup({ el, App, props }) {
        const Root = <AppWrapper App={App} props={props} />;

		if (import.meta.env.DEV) {
            createRoot(el).render(Root);
            return;
		}

        hydrateRoot(el, Root);
	},
	progress: {
		color: '#4B5563',
	},
});
