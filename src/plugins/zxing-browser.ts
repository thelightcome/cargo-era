import { Plugin } from '@nuxt/types'
import { BrowserQRCodeReader, BrowserCodeReader } from '@zxing/browser'

export interface IZxingBrowser {
  BrowserQRCodeReader: typeof BrowserQRCodeReader
  BrowserCodeReader: typeof BrowserCodeReader
}

const plugin: Plugin = (_, inject) => {
  const codeReaders: IZxingBrowser = { BrowserQRCodeReader, BrowserCodeReader }

  inject('codeReaders', codeReaders)
}

export default plugin
