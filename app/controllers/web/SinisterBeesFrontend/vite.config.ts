import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/web/',
  server: {
    host: '0.0.0.0',
    headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
    }
  },
  plugins: [
    react(),
    // ,VitePWA({
    //   registerType: 'autoUpdate',
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,png,svg}'],
    //   },
    //   manifest: {
    //     name: 'SinisterBees - ba',
    //     short_name: 'SinisterBees',
    //     description: 'Beeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees',
    //     theme_color: '#121010',
    //     icons: [
    //       {
    //         src: '/icon-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/icon-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
  ],
});
