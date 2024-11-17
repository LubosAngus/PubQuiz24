import QuizTheme from './primevue.theme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    // ? to change, go to .env and prefix these with NUXT_PUBLIC_[name]
    public: {
      SPOTIFY_CLIENT_ID: undefined,
      DIRECTUS_PORT: undefined,
      DIRECTUS_API_TOKEN: undefined,
    },
  },
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  primevue: {
    options: {
      theme: {
        preset: QuizTheme,
        ripple: true,
        inputVariant: 'filled',
        options: {
          darkModeSelector: true,
        },
      },
    },
  },
  app: {
    head: {
      title: 'PubQuiz Pyčo',

      // TODO: download fonts locally to serve them even without internet
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    },
  },
})
