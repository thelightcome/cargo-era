<template>
  <div class="moz-scanner" @click="$emit('click')">
    supportedFormats - {{ supportedFormats }}
    <video ref="video" class="moz-scanner__video">
      Video stream not available.
    </video>
    <canvas ref="canvas" class="moz-scanner__canvas"></canvas>
    {{ error }}
    <div class="moz-scanner__btns">
      <button class="moz-scanner__btn" @click="takepicture">Photo</button>
      <button class="moz-scanner__btn" @click="clearphoto">Clear</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MozScanner',
  data() {
    return {
      isSupport: false,
      barcodeDetector: null as any,
      supportedFormats: [] as string[],
      error: '' as any,
      streaming: false,
      width: 320,
      height: 0,
      canvas: null as HTMLCanvasElement | null,
      video: null as HTMLVideoElement | null,
      context: null as CanvasRenderingContext2D | null,
    }
  },
  async mounted() {
    this.initMedia()
    this.check()
    await this.getSupportDormats()
    this.init()
  },
  methods: {
    check() {
      this.isSupport = 'BarcodeDetector' in window
    },
    async getSupportDormats() {
      if (this.isSupport) {
        this.supportedFormats = await window.BarcodeDetector.getSupportedFormats()
      }
    },
    init() {
      if (this.isSupport) {
        this.barcodeDetector = new window.BarcodeDetector({
          formats: this.supportedFormats,
        })
      }
    },
    initMedia() {
      this.video = this.$refs.video as HTMLVideoElement
      this.canvas = this.$refs.canvas as HTMLCanvasElement
      this.context = this.canvas.getContext('2d')
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: 'environment',
          },
          audio: false,
        })
        .then((stream) => {
          if (this.video === null) return
          this.video.srcObject = stream
          this.video.play()
        })
        .catch((err) => {
          console.log('An error occurred: ' + err)
        })
      this.video.addEventListener(
        'canplay',
        () => {
          if (!this.streaming && this.video && this.canvas) {
            this.height =
              this.video.videoHeight / (this.video.videoWidth / this.width)

            this.video.setAttribute('width', String(this.width))
            this.video.setAttribute('height', String(this.height))
            this.canvas.setAttribute('width', String(this.width))
            this.canvas.setAttribute('height', String(this.height))
            this.streaming = true
          }
        },
        false
      )
    },
    takepicture() {
      if (!this.context || !this.canvas || !this.video || this.video.paused)
        return
      if (this.width && this.height) {
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context.drawImage(this.video, 0, 0, this.width, this.height)
        this.video.pause()
        this.detect()
      } else {
        this.clearphoto()
      }
    },
    clearphoto() {
      if (!this.canvas || !this.context || !this.video || !this.video.paused)
        return
      this.video.play()
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    detect() {
      if (!this.barcodeDetector) return
      this.barcodeDetector
        .detect(this.video)
        .then((barcodes: any[]) => {
          this.error = barcodes
          barcodes.forEach((barcode) => console.log(barcode.rawValue))
          this.$emit('onDecode', barcodes)
        })
        .catch((err: any) => {
          this.error = err
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.moz-scanner {
  width: 100%;
  position: relative;

  &__video {
    width: 100%;
    height: auto;
  }

  &__canvas {
    position: absolute;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
  }

  &__btns {
    margin-top: 0.5rem;
  }
}
</style>
