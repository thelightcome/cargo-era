import https from 'https'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Context } from '@nuxt/types'
/**
 * @param {Context} ctx
 */
export default function (ctx) {
  if (process.env.NODE_ENV !== 'development') {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: true,
    })
    ctx.$axios.defaults.httpsAgent = httpsAgent
  }

  ctx.$axios.setHeader(
    'Accept-Language',
    ctx.app.i18n.locales.find((item) => item.code === ctx.app.i18n.locale).code
  )

  ctx.$axios.onError((error) => {
    const code = error.code || error.response?.status
    if (code) {
      ctx.$services.common.error.onError(code)
    }
    return Promise.reject(error)
  })

  ctx.$axios.interceptors.request.use(function (response) {
    // @ts-ignore
    const token = ctx.$auth.strategy.token.get()

    if (token) {
      ctx.$axios.setHeader('Authorization', token)
    }

    return response
  })
}
