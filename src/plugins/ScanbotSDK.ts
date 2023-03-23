// import { Plugin } from '@nuxt/types'
// import ScanbotSDK from 'scanbot-web-sdk/webpack'
// import { IBarcodeScannerHandle } from 'scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle'

// async function initSdkScanbot(configuration: any) {
//   const scanbotSDKInit = await ScanbotSDK.initialize({
//     licenseKey: process.env.SCANBOT_SDK_LICENSE_KEY || '',
//   })

//   const scanbotSDKBarCode = await scanbotSDKInit.createBarcodeScanner(
//     configuration
//   )

//   return scanbotSDKBarCode
// }

// export type ISdkScanbot = typeof initSdkScanbot

// export type IscanbotSDKBarCode = IBarcodeScannerHandle

// const plugin: Plugin = (_, inject) => {
//   inject('sdkScanbot', initSdkScanbot)
// }

// export default plugin
