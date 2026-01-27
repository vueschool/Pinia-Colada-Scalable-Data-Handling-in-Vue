// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/main.css"],
  ssr: false,
  devtools: { enabled: true },
  hub: {
    db: "sqlite",
  },
  modules: [
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
    "@nuxthub/core",
  ],
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
