<template>
  <div class="camera-container full">
    <video
      ref="camera"
      class="camera full"
      muted
      autoplay="true"
      playsinline="true"
      webkit-playsinline
    ></video>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
  name: 'VisionCamera',
  props: {
    desiredCamera: {
      type: String,
      required: true,
    },
    desiredResolution: {
      type: Object as PropType<{ width: string; height: string }>,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      camera: null as null | HTMLVideoElement,
      devices: null as null | MediaDeviceInfo[],
      localStream: null as null | MediaStream,
    }
  },
  watch: {
    isActive(newVal) {
      if (newVal === true) {
        this.playWithDesired()
      } else {
        this.stop()
      }
    },
  },
  beforeDestroy() {
    this.stop()
  },
  mounted() {
    this.camera = this.$refs.camera as HTMLVideoElement
    if (this.isActive) this.playWithDesired()
    this.onCameraOpened()
  },
  methods: {
    async loadDevices() {
      const constraints = { video: true, audio: false }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      const mediaDevices = await navigator.mediaDevices.enumerateDevices()
      const cameraDevices = []
      for (let i = 0; i < mediaDevices.length; i++) {
        const device = mediaDevices[i]
        if (device.kind === 'videoinput') {
          cameraDevices.push(device)
        }
      }
      this.devices = cameraDevices
      const tracks = stream.getTracks()
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i]
        track.stop()
      }
      this.$emit('devicesLoaded', this.devices)
    },
    getDesiredDevice(devices: MediaDeviceInfo[]) {
      let count = 0
      let desiredIndex = 0
      for (let i = 0; i < devices.length; i++) {
        const device = devices[i]
        const label = device.label || `Camera ${count++}`
        if (this.desiredCamera) {
          if (label.toLowerCase().includes(this.desiredCamera.toLowerCase())) {
            desiredIndex = i
            break
          }
        }
      }

      if (devices.length > 0) {
        return devices[desiredIndex].deviceId
      } else {
        return null
      }
    },
    stop() {
      try {
        if (this.localStream) {
          this.localStream.getTracks().forEach((track: any) => track.stop())
          this.$emit('closed')
        }
      } catch (e: any) {
        console.log(e.message)
      }
    },
    play(options: any) {
      const $this = this
      this.stop()
      let constraints = {} as any
      if (options.deviceId) {
        constraints = {
          video: { deviceId: options.deviceId },
          audio: false,
        }
      } else {
        constraints = {
          video: { width: 1280, height: 720 },
          audio: false,
        }
      }
      if (options.desiredResolution) {
        constraints.video.width = options.desiredResolution.width
        constraints.video.height = options.desiredResolution.height
      }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          $this.localStream = stream
          if ($this.camera) $this.camera.srcObject = stream
        })
        .catch(function (err) {
          console.error('getUserMediaError', err, err.stack)
        })
    },
    async playWithDesired() {
      if (!this.devices) {
        await this.loadDevices()
      }
      if (!this.devices) return
      const desiredDevice = this.getDesiredDevice(this.devices)
      if (desiredDevice) {
        const options = {} as any
        options.deviceId = desiredDevice
        if (this.desiredResolution) {
          options.desiredResolution = this.desiredResolution
        }
        this.play(options)
      } else {
        throw new Error('No camera detected')
      }
    },
    onCameraOpened() {
      this.$emit('opened', this.camera)
    },
  },
})
</script>

<style lang="scss" scoped>
.camera-container {
  position: relative;
}

.camera {
  position: absolute;
  object-fit: cover;
}

.full {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
