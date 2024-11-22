import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './Context/CartContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Creamos un componente wrapper para manejar el CartProvider
function AppWrapper({ children, auth }) {
    return (
        <CartProvider user={auth.user}>
            {children}
        </CartProvider>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <App {...props}>
                {({ Component, props }) => (
                    <AppWrapper auth={props.auth}>
                        <Component {...props} />
                    </AppWrapper>
                )}
            </App>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
