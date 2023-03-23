import { Plugin, Context } from '@nuxt/types'
import { BarcodeScanner } from 'dynamsoft-javascript-barcode'

async function initDynamicSoftScanner(key: string) {
  BarcodeScanner.license = key
  BarcodeScanner.engineResourcePath = '/dyncamicsoft'
  // BarcodeScanner.engineResourcePath =
  //   'https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/'
  await BarcodeScanner.loadWasm()
  const reader = await BarcodeScanner.createInstance()
  return reader
}

export type IDynamicSoftScanner = () => ReturnType<
  typeof initDynamicSoftScanner
>

const plugin: Plugin = (ctx: Context, inject) => {
  inject('dynamicSoftScanner', async () => {
    const reader = await initDynamicSoftScanner(
      ctx.$config.DYNAMIC_SOFT_LICENSE_KEY
    )
    return reader
  })
}

export default plugin
