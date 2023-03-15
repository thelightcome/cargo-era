const path = require('path')
const { getWebpackConfig } = require('nuxt')

const FILTERED_PLUGINS = [
  'WebpackBarPlugin',
  'VueSSRClientPlugin',
  'HotModuleReplacementPlugin',
  'FriendlyErrorsWebpackPlugin',
  'HtmlWebpackPlugin',
]

module.exports = async () => {
  const nuxtWebpackConfig = await getWebpackConfig('client', {
    for: 'dev',
  })

  const webpackConfig = {
    module: {
      rules: [
        ...nuxtWebpackConfig.module.rules.filter(
          (a) => a.loader !== 'eslint-loader'
        ),
      ],
    },
    resolve: { ...nuxtWebpackConfig.resolve },
    plugins: [
      ...nuxtWebpackConfig.plugins.filter(
        (p) => !FILTERED_PLUGINS.includes(p.constructor.name)
      ),
    ],
  }

  return {
    sections: [],
    // require: [path.join(__dirname, './src/assets/scss/main.scss')],
    webpackConfig,
    usageMode: 'expand',
    styleguideDir: './doc',
  }
}
