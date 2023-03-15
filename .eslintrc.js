module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  rules: {
    'vue/script-setup-uses-vars': 0,
    'vue/no-v-html': 0,
    'no-console': 0,
    'no-useless-constructor': 0,
    'import/named': 0,
    camelcase: 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
