// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    mmsToken: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL21tcy1kZXZlbG9wbWVudC5kZXYubXVsdGlwbGF5LnBsIiwiaWF0IjoxNzE2MjA2MTY2LCJleHAiOjE3NDc3NDIxNjYsIm5iZiI6MTcxNjIwNjE2NiwianRpIjoiT1lpQnV3UzhETkowOHpwMyIsInN1YiI6IjI1IiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsInR5cGUiOiJ1c2VyIn0.c320EyOmMUjYnKjf7oOrtx3mdyflDdt5OYOd-rY9_rOnJtQRCoES3N_TdQYo5TY5WcXG0Yv6R1O0RQyM0oaj9A'
  },
  components: [
    {
      path: '@/components',
      pathPrefix: false
    },
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],

});
