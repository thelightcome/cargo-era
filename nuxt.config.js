import { resolve } from 'path'
import { readFileSync } from 'fs'

import { ru } from './src/i18n/ru'

const config = {
  ssr: process.env.NODE_ENV !== 'mobile',

  server: {
    host: '0.0.0.0',
    https: {
      key: readFileSync(resolve(__dirname, 'ssh/thelightcome.key')),
      cert: readFileSync(resolve(__dirname, 'ssh/thelightcome.crt')),
    },
  },

  router: {
    mode: process.env.NODE_ENV === 'mobile' ? 'hash' : 'history',
  },

  generate: {
    minify: {
      collapseWhitespace: false,
    },
    fallback: 'error.html',
  },

  env: {
    apiEnv: process.env.API_URL,
    baseUrl: process.env.API_URL !== '',
    ROLE_ADMIN: 'ROLE_ADMIN',
  },

  head: {
    title: `Cargo`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'msapplication-TileColor', content: '#363433' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [],
  },

  // loading: '~/components/atoms/Loader/index.vue',

  pageTransition: {},

  srcDir: 'src/',

  alias: {
    icons: resolve(__dirname, './src/assets/icons'),
    images: resolve(__dirname, './src/assets/images'),
    pages: resolve(__dirname, './src/pages'),
    components: resolve(__dirname, './src/components'),
    directives: resolve(__dirname, './src/directives'),
    services: resolve(__dirname, './src/services'),
    repositories: resolve(__dirname, './src/repositories'),
    types: resolve(__dirname, './src/types'),
    plugins: resolve(__dirname, './src/plugins'),
    store: resolve(__dirname, './src/store'),
  },

  css: ['~/assets/scss/main.scss'],

  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/services/index.ts' },
    { src: '~/plugins/repositories/index.ts' },
    { src: '~/plugins/touch-events.ts', mode: 'client' },
    { src: '~/plugins/v-mask.js' },
    { src: '~/plugins/code-reader.ts', mode: 'client' },
  ],

  components: false,

  modern: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/svg',
    'nuxt-build-optimisations',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/i18n',
    'nuxt-healthcheck',
    '@nuxtjs/proxy',
  ],
  healthcheck: {
    path: '/actuator/health',
    contentType: 'application/json',
    healthy: () => {
      return JSON.stringify({ status: 'OK' })
    },
  },
  markdownit: {
    preset: 'default',
    runtime: true,
    linkify: true,
    breaks: true,
  },

  buildOptimisations: {
    profile: process.env.NODE_ENV === 'development' ? 'risky' : 'expiremental',
  },

  styleResources: {
    scss: [
      './src/assets/scss/_variables.scss',
      './src/assets/scss/_mixins.scss',
    ],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'id_token',
          maxAge: 60 * 60 * 24,
        },
        user: {
          property: '',
        },
        endpoints: {
          login: { url: '/authenticate', method: 'post' },
          user: { url: '/account', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth',
      logout: '/auth',
      callback: '/auth',
      home: '/user',
    },
    rewriteRedirects: true,
    cookie: {
      options: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
    localStorage: true,
  },

  i18n: {
    locales: [
      {
        code: 'ru',
        name: 'Русский',
        iso: 'ru-RU',
      },
    ],
    defaultLocale: 'ru',
    vueI18nLoader: true,
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'ru',
      silentTranslationWarn: true,
      messages: {
        ru,
      },
    },
  },

  axios: {
    proxy: true,
    prefix: process.env.API_URL,
    retry: { retries: 3 },
  },

  proxy: {
    '/api': {
      target: process.env.API_URL,
      changeOrigin: true,
    },
  },

  pwa: {
    manifest: {
      name: 'Cargo',
      short_name: 'Cargo',
      description: 'Cargo',
      lang: 'ru',
      start_url: process.env.API_URL,
      display: 'standalone',
      theme_color: '#211f1d',
      orientation: 'portrait',
    },
    workbox: false,
  },

  build: {
    publicPath: '/nuxt/',
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    extend(config, _) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    },
  },
}

export default config
