<template>
  <div ref="readerDiv" class="dynamsoft-soft-scanner"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DynamicSoftScanner',
  async mounted() {
    const reader = await this.$dynamicSoftScanner()
    const readerDiv = this.$refs.readerDiv as HTMLDivElement
    readerDiv.appendChild(reader.getUIElement())
    reader.onFrameRead = (results) => {
      for (const result of results) {
        this.$emit('onDecode', result.barcodeText)
      }
    }
    await reader.open()
  },
})
</script>

<style lang="scss" scoped>
.dynamsoft-soft-scanner {
  width: 100%;
  aspect-ratio: 1.8;
  max-height: 450px;

  ::v-deep div {
    .dce-btn-close,
    .dce-sel-camera,
    .dce-sel-resolution,
    .dbr-msg-poweredby {
      display: none;
      pointer-events: none;
      visibility: hidden;
    }
  }
}
</style>
