import { IZxingBrowser } from 'src/plugins/zxing-browser'
import { ISdkScanbot } from 'src/plugins/ScanbotSDK'
import { IDynamicSoftScanner } from 'src/plugins/DynamicSoftScanner'

declare module 'vue/types/vue' {
  interface Vue {
    $codeReaders: IZxingBrowser
    $sdkScanbot: ISdkScanbot
    $dynamicSoftScanner: IDynamicSoftScanner
  }
}

declare module '@nuxt/types' {
  interface Context {
    $codeReaders: IZxingBrowser
    $sdkScanbot: ISdkScanbot
    $dynamicSoftScanner: IDynamicSoftScanner
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $codeReaders: IZxingBrowser
    $sdkScanbot: ISdkScanbot
    $dynamicSoftScanner: IDynamicSoftScanner
  }
}
