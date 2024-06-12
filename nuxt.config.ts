export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  runtimeConfig:{
    mmsToken: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJodHRwczovL21tcy1kZXZlbG9wbWVudC5kZXYubXVsdGlwbGF5LnBsIiwiaWF0IjoxNzE2MjA2MTY2LCJleHAiOjE3NDc3NDIxNjYsIm5iZiI6MTcxNjIwNjE2NiwianRpIjoiT1lpQnV3UzhETkowOHpwMyIsInN1YiI6IjI1IiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsInR5cGUiOiJ1c2VyIn0.c320EyOmMUjYnKjf7oOrtx3mdyflDdt5OYOd-rY9_rOnJtQRCoES3N_TdQYo5TY5WcXG0Yv6R1O0RQyM0oaj9A'
  },
  components: [
    {
      path: '@/components',
      pathPrefix: false
    },
  ],
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-security', '@nuxt/devtools', '@nuxt/test-utils/module'],
  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
    },
  },
  routeRules: {
    '/api/address/house': {
      security: {
        rateLimiter: {
          tokensPerInterval: 2000, // -> those are 10 calls, for example 0 = 1 calls, 3 = 4 calls
          interval: 10000 * 360 * 24,
          throwError: true,
        }
      }
    }
  },

  // experimental: {
  //   inlineRouteRules: true
  // },
});