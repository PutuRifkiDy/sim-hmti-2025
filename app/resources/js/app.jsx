import 'sonner/dist/styles.css'
import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from './Components/ThemeProvider';
import { useEffect, useState } from 'react';
import Loading from './Components/Loading';
import { Inertia } from '@inertiajs/inertia';
import { Toaster } from './Components/ui/sonner';

const appName = import.meta.env.VITE_APP_NAME || 'HMTI-2025';

// const AppWrapper = ({ App, props }) => {
// 	return (
// 		<ThemeProvider defaultTheme="light" storageKey="current-theme">
// 			<App {...props} />
// 		</ThemeProvider>
// 	);
// };

const AppWrapper = ({ App, props }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const start = () => setIsLoading(true);
        const finish = () => setIsLoading(false);

        Inertia.on('start', start);
        Inertia.on('finish', finish);

        return () => {
            Inertia.off('start', start);
            Inertia.off('finish', finish);
        };
    }, []);

    return (
        <ThemeProvider defaultTheme="light" storageKey="current-theme">
            {/* <DisableInspect /> */}
            {isLoading && <Loading />}
            <App {...props} />
            <Toaster
                richColors
                position="top-center"
            />
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
