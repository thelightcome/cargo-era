<template>
  <div class="scanner" @click="$emit('click')">
    <ClientOnly>
      <StreamBarcodeReader
        class="scanner__body"
        @decode="onDecode"
        @loaded="onLoaded"
      ></StreamBarcodeReader>
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Scanner',
  methods: {
    onDecode(e: string) {
      this.$emit('onDecode', e)
    },
    onLoaded(e: any) {
      console.log('loaded', e)
      this.$emit('loaded', e)
    },
  },
})
</script>

<style lang="scss" scoped></style>
