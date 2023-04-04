

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
  REDIRECT_ON_OPTIONS: {"ALL":"all","ROOT":"root","NO_PREFIX":"no prefix"},
}
export const nuxtOptions = {
  isUniversalMode: false,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {"fallbackLocale":"ru","silentTranslationWarn":true,"messages":{"ru":{"errors":{"required":"required","isEmail":"isEmail","min":"min","max":"max","password":"password","sameText":"sameText","isPhone":"isPhone"},"unsuccessfully":"Error","pageErrorMsg":"Неправильно набран URL-адрес, либо страницы больше не существует","toMain":"Перейти назад"},"kz":{"errors":{"required":"required","isEmail":"isEmail","min":"min","max":"max","password":"password","sameText":"sameText","isPhone":"isPhone"},"unsuccessfully":"Error","pageErrorMsg":"Неправильно набран URL-адрес, либо страницы больше не существует","toMain":"Перейти назад"}}},
  vueI18nLoader: true,
  locales: [{"code":"ru","name":"Русский","iso":"ru-RU"},{"code":"kk","name":"Қазақша","iso":"kk-KZ"}],
  defaultLocale: "ru",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  sortRoutes: true,
  strategy: "prefix_except_default",
  lazy: false,
  langDir: null,
  rootRedirect: null,
  detectBrowserLanguage: false,
  differentDomains: false,
  baseUrl: "",
  vuex: {"moduleName":"i18n","syncRouteParams":true},
  parsePages: true,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  onBeforeLanguageSwitch: () => {},
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"ru","name":"Русский","iso":"ru-RU"},{"code":"kk","name":"Қазақша","iso":"kk-KZ"}],
  localeCodes: ["ru","kk"],
  additionalMessages: [],
}

export const localeMessages = {}
