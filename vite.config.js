import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],

      manifest: {
        name: "EXIF Frame Creator",
        short_name: "EXIF Frame",
        description: "Crie frames com metadados EXIF offline",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,

        runtimeCaching: [
          {
            // JS e CSS
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
            },
          },
          {
            // IMAGENS (essencial para offline + canvas)
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            // APIs
            urlPattern: /^https?.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
    }),
  ],
});
