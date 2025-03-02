// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@vueuse/nuxt',
    '@zadigetvoltaire/nuxt-gtm',
    // 'nuxt-security',
    '@nuxt/scripts',
    '@nuxtjs/seo',
    'nuxt-lodash',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-viewport',
    'nuxt-swiper',
    'nuxt-jsonld',
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      titleTemplate: '%s %separator %siteName',
    },
  },

  site: {
    url: process.env.SITE_URL,
    name: process.env.SITE_NAME,
    description: process.env.SITE_DESCRIPTION,
    // defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
    trailingSlash: true,
  },

  colorMode: {
    disableTransition: true,
  },

  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },

  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:8000',
      FORM_URL: process.env.FORM_URL,
    },
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-11',

  typescript: {
    strict: false,
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  gtm: {
    id: 'GTM-XXX',
    enabled: false,
    debug: true,
    enableRouterSync: true,
  },

  pwa: {

    /* your pwa options */
  },
  // sentry: {
  //   dsn: '', // Enter your project's DSN.
  //   // Additional module options go here.
  // },

  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },

    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },

    fallbackBreakpoint: 'lg',
  },
});
