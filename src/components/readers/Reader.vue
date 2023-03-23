<template>
  <div class="reader" @click="$emit('click')">
    <ClientOnly>
      <StreamBarcodeReader
        class="reader__body"
        @decode="onDecode"
        @loaded="onLoaded"
      ></StreamBarcodeReader>
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Reader',
  methods: {
    onDecode(e: string) {
      this.$emit('onDecode', e)
    },
    onLoaded(e: any) {
      this.$emit('loaded', e)
    },
  },
})
</script>

<style lang="scss" scoped></style>
