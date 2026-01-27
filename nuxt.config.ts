// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/colada-nuxt",
    "@pinia/nuxt",
  ],
});