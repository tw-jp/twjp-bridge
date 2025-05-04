// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/supabase', '@unocss/nuxt'],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_BASE_URL: process.env.NUXT_DOMAIN,
    },
  },
  css: ['@/assets/styles/reset.css'],
})
