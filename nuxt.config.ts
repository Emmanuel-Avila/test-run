// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: true,
  modules: ['vuetify-nuxt-module', '@nuxt/eslint'],
  typescript: {
    typeCheck: true
  }
  
})