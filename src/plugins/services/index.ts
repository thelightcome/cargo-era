import { Plugin } from '@nuxt/types'
import services, { servicesType } from 'services/index'

/**
 *
 * @param {Context} ctx
 * @param inject
 */
const plugin: Plugin = (ctx, inject) => {
  const s: servicesType = services(ctx)

  inject('services', s)
}

export default plugin
