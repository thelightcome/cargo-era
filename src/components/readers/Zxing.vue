<template>
  <div class="zxing">
    <canvas ref="canvas" class="zxing__canvas" @click="restart"></canvas>
  </div>
</template>

<script>
let audioContext = null
let barcodeDetector = null
let workerZxing = null
let workerZbar = null
let oldTime = 0

export default {
  name: 'Zxing',
  data() {
    return {
      result: false,
      streaming: false,
      width: 320,
      height: 0,
      canvas: null,
      video: null,
      context: null,
      animId: null,
    }
  },
  async mounted() {
    this.fixAudioContextWrap()
    this.initWorker()
    await this.initNativeScanner()
    this.initMedia()
  },
  beforeDestroy() {
    if (this.animId !== null) cancelAnimationFrame(this.animId)
    this.stopStreamedVideo()
    if (workerZxing !== null) workerZxing.terminate()
    if (workerZbar !== null) workerZbar.terminate()
  },
  methods: {
    fixAudioContextWrap() {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      if (window.AudioContext) audioContext = new window.AudioContext()
      document.addEventListener('touchstart', this.fixAudioContext)
      document.addEventListener('touchend', this.fixAudioContext)
    },
    fixAudioContext() {
      if (audioContext) {
        const buffer = audioContext.createBuffer(1, 1, 22050)
        const source = audioContext.createBufferSource()
        source.buffer = buffer
        source.connect(audioContext.destination)
        if (source.start) source.start(0)
        else if (source.play) source.play(0)
        else if (source.noteOn) source.noteOn(0)
      }
      document.removeEventListener('touchstart', this.fixAudioContext)
      document.removeEventListener('touchend', this.fixAudioContext)
    },
    beep(freq = 750, duration = 150, vol = 5) {
      try {
        const oscillator = audioContext.createOscillator()
        const gain = audioContext.createGain()
        oscillator.connect(gain)
        oscillator.frequency.value = freq
        oscillator.type = 'square'
        gain.connect(audioContext.destination)
        gain.gain.value = vol * 0.01
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration * 0.001)
      } catch (e) {
        console.warn(`Sorry, Web Audio API is not supported by your browser`)
        console.warn(e.toString())
      }
    },
    initMedia() {
      this.canvas = this.$refs.canvas
      this.width = this.canvas.width = this.canvas.clientWidth
      this.height = this.canvas.height = this.canvas.clientHeight
      const video = document.createElement('video')
      video.setAttribute('id', 'video')
      video.setAttribute('width', this.width)
      video.setAttribute('height', this.height)
      video.setAttribute('autoplay', '')
      this.video = video
      this.context = this.canvas.getContext('2d', { willReadFrequently: true })
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
          const tracks = stream.getVideoTracks()
          tracks.forEach((track) => {
            track
              .applyConstraints({
                advanced: [{ exposureMode: 'manual' }],
              })
              .then(() => {
                track.applyConstraints({
                  advanced: [{ exposureTime: 3 }],
                })
              })
          })
          this.video.play()
        })
        .catch((err) => console.log('An error occurred: ' + err))
      this.video.addEventListener(
        'canplay',
        () => {
          if (!this.streaming && this.video && this.canvas) {
            this.streaming = true
            this.animId = requestAnimationFrame(this.tick)
          }
        },
        false
      )
    },
    tick(time) {
      if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
        this.context.drawImage(this.video, 0, 0)
        this.context.drawImage(
          this.video,
          0,
          0,
          +this.canvas.width,
          +this.canvas.height
        )
        if (time - oldTime > 600) {
          oldTime = time
          const imageData = this.context.getImageData(
            0,
            0,
            +this.canvas.width,
            +this.canvas.height
          )
          workerZxing.postMessage(imageData)
          workerZbar.postMessage(imageData)
          this.detect()
        }
      }
      this.animId = requestAnimationFrame(this.tick)
    },
    async initNativeScanner() {
      if (!('BarcodeDetector' in window)) return
      const supportedFormats = await window.BarcodeDetector.getSupportedFormats()
      barcodeDetector = new window.BarcodeDetector({
        formats: supportedFormats,
      })
    },
    detect() {
      if (!barcodeDetector) return
      barcodeDetector
        .detect(this.video)
        .then((barcodes) => {
          const stats = []
          barcodes.forEach((barcode) => {
            const find = stats.find((e) => e.val === barcode.rawValue)
            if (find) find.count += 1
            else stats.push({ val: barcode.rawValue, count: 1 })
          })
          const maxInd = stats.reduce((max, e, ind) => {
            if (stats[max].count > e.count) return max
            else return ind
          }, 0)
          if (stats[maxInd] && !this.result) {
            this.stopAnalyze(true)
            this.onDecode(stats[maxInd].val)
          }
        })
        .catch((err) => {
          this.error = err
        })
    },
    initWorker() {
      if (navigator.serviceWorker) {
        navigator.serviceWorker
          .register('/zxing/sw.js')
          .then((registration) =>
            console.log(
              `ServiceWorker Zxing registration successful with scope: ${registration.scope}`
            )
          )
          .catch((error) =>
            console.log(`ServiceWorker Zxing registration failed: ${error}`)
          )
        navigator.serviceWorker
          .register('/zbar/sw.js')
          .then((registration) =>
            console.log(
              `ServiceWorker Zbar registration successful with scope: ${registration.scope}`
            )
          )
          .catch((error) =>
            console.log(`ServiceWorker Zbar registration failed: ${error}`)
          )
      }
      workerZxing = new Worker('/zxing/wasmWorker.js')
      workerZxing.onmessage = (ev) => this.terminateZhingWorker(ev.data)
      workerZbar = new Worker('/zbar/wasmWorker.js')
      workerZbar.onmessage = (ev) => this.terminateZbarWorker(ev.data)
    },
    terminateZhingWorker(data) {
      if (data.error) this.stopAnalyze()
      if (data.format && !this.result) {
        this.stopAnalyze(true)
        this.drawResult(data)
        this.onDecode(data.text)
      }
    },
    terminateZbarWorker(data) {
      if (data && !this.result) {
        this.stopAnalyze(true)
        this.onDecode(data)
      }
    },
    stopAnalyze(valid = false) {
      cancelAnimationFrame(this.animId)
      this.stopVideo()
      if (valid) {
        this.result = true
        this.beep()
      }
    },
    stopVideo() {
      if (this.video && !this.video.paused) {
        this.streaming = false
        this.video.pause()
      }
    },
    playVideo() {
      if (this.video && this.video.paused) {
        this.streaming = true
        this.video.play()
      }
    },
    onDecode(e) {
      this.$emit('onDecode', e)
    },
    stopStreamedVideo() {
      const stream = this.video.srcObject
      const tracks = stream.getTracks()

      tracks.forEach((track) => {
        track.stop()
      })

      this.video.srcObject = null
    },
    drawResult(code) {
      this.context.beginPath()
      this.context.lineWidth = 4
      this.context.strokeStyle = 'red'
      this.context.moveTo(code.position.topLeft.x, code.position.topLeft.y)
      this.context.lineTo(code.position.topRight.x, code.position.topRight.y)
      this.context.lineTo(
        code.position.bottomRight.x,
        code.position.bottomRight.y
      )
      this.context.lineTo(
        code.position.bottomLeft.x,
        code.position.bottomLeft.y
      )
      this.context.lineTo(code.position.topLeft.x, code.position.topLeft.y)
      this.context.stroke()
    },
    restart() {
      if (this.streaming) return
      this.result = false
      this.playVideo()
      this.animId = requestAnimationFrame(this.tick)
    },
  },
}
</script>

<style lang="scss" scoped>
.zxing {
  width: 100%;
  position: relative;

  &__canvas {
    width: 100%;
    aspect-ratio: 1;
  }
}
</style>
