<template>
  <div class="coder">
    <div>
      <button
        v-for="vd in videoInputDevices"
        :key="vd.deviceId"
        @click="decode(vd.deviceId)"
      >
        {{ vd.label }}
      </button>
    </div>
    <video
      id="video"
      width="300"
      height="200"
      style="border: 1px solid gray"
    ></video>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BarCode',
  data() {
    return {
      barcodeDetector: null as null | any,
      videoInputDevice: null as null | string,
      videoInputDevices: null as null | any[],
    }
  },
  async mounted() {
    await this.init()
  },
  methods: {
    async init() {
      this.barcodeDetector = new this.$codeReaders.BrowserQRCodeReader()
      this.videoInputDevices = await this.$codeReaders.BrowserCodeReader.listVideoInputDevices()
      this.videoInputDevice = this.videoInputDevices[
        this.videoInputDevices.length - 1
      ].deviceId
    },
    decode(id: string) {
      if (this.videoInputDevice === null) return
      const $this = this
      this.barcodeDetector?.decodeFromVideoDevice(
        id,
        'video',
        (result: string) => {
          console.log('result', result)
          if (result) {
            $this.$emit('onDecode', result)
            // setTimeout(() => controls.stop(), 20000)
          }
        }
      )
    },
  },
})
</script>

<style lang="scss" scoped></style>
