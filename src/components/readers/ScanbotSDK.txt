<template>
  <div
    id="scanbor-sdk-container"
    ref="container"
    class="scanbor-sdk-container"
  ></div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IscanbotSDKBarCode } from 'src/plugins/ScanbotSDK'
// 25000$ in YEAR
const CODE_TYPES = [
  'AZTEC',
  'CODABAR',
  'CODE_39',
  'CODE_93',
  'CODE_128',
  'DATA_MATRIX',
  'EAN_8',
  'EAN_13',
  'ITF',
  'MAXICODE',
  'PDF_417',
  'QR_CODE',
  'RSS_14',
  'RSS_EXPANDED',
  'UPC_A',
  'UPC_E',
  'UPC_EAN_EXTENSION',
  'MSI_PLESSEY',
]

export default Vue.extend({
  name: 'ScanbotSDK',
  data() {
    return {
      scanbotSDK: null as null | IscanbotSDKBarCode,
    }
  },
  beforeDestroy() {
    this.scanbotSDK?.dispose()
  },
  async mounted() {
    const container = this.$refs.container as HTMLDivElement
    const style = container.getBoundingClientRect()
    this.scanbotSDK = await this.$sdkScanbot({
      containerId: 'scanbor-sdk-container',
      videoConstraints: `${style.width}x${style.height}`,
      barcodeFormats: CODE_TYPES,
      style: {
        window: {
          aspectRatio: 1.2,
          widthProportion: 0.8,
          borderColor: 'white',
          left: '50%',
          top: '45%',
          transform: 'translate(-50%, -50%)',
        },
        text: {
          color: 'white',
          size: '0.9em',
          weight: 300,
        },
        hint: 'Please align the code in the frame above to scan it',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      onBarcodesDetected: (res: any) => {
        this.$emit('onDecode', res.barcodes.find((e: any) => e.text).text)
      },
      onError: (err: any) => {
        console.log(err)
      },
    })
    this.scan()
  },
  methods: {
    scan() {
      this.scanbotSDK?.resumeDetection()
    },
  },
})
</script>

<style lang="scss" scoped>
.scanbor-sdk-container {
  width: 100%;
  aspect-ratio: 1;
}
</style>
