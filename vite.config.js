import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        host: true,
        port: 5173,
        strictPort: true,

        // Allow requests from any hostname
        allowedHosts: true,

        // Allow cross-origin requests from Laravel
        cors: {
            origin: true,
            credentials: true,
        },

        hmr: {
            host: "localhost",
            protocol: "ws",
            port: 5173,
        },
    },
});
