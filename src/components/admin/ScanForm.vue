<template>
  <div class="scan-form" :class="{ 'scan-form--active': value }">
    <Button
      class="scan-form__btn"
      version="primary"
      variant="filled"
      @click="active = !active"
    >
      <span class="scan-form__btn-inner">
        <span>{{ title }}</span>
        <component :is="getIcon" class="scan-form__icon"></component>
      </span>
    </Button>
    <ClientOnly>
      <DynamicSoftScanner
        v-if="active && isBarCode"
        class="scan-form__barcode"
        @onDecode="onDecode"
      />
      <!-- <ScanbotSDK @onDecode="onDecode" /> -->
      <!-- <MozScanner /> -->
      <!-- <ZXingCoder @onDecode="onDecode" /> -->
      <!-- <v-quagga
        v-if="active && isBarCode"
        :on-detected="onDecode"
        class="scanner"
        :reader-types="barcodes"
      ></v-quagga> -->
      <Reader
        v-if="active && !isBarCode"
        class="scan-form__scanner"
        @onDecode="onDecode"
        @click="active = false"
      />
    </ClientOnly>
    <Input
      :id="title"
      v-model="model"
      type="text"
      :label="getTitle"
      icon="text"
      :disabled="false"
      class="scan-form__input"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

import IconBarCode from 'icons/barcode.svg?inline'
import IconQrCode from 'icons/qr-code.svg?inline'

import Input from 'components/ui/Input.vue'
import Button from 'components/ui/Button.vue'
import Reader from 'components/readers/Reader.vue'
import ZXingCoder from 'components/readers/ZXingCoder.vue'
import MozScanner from 'components/readers/MozScanner.vue'
import ScanbotSDK from 'components/readers/ScanbotSDK.vue'
import DynamicSoftScanner from 'components/readers/DynamicSoftScanner.vue'

export type TYPES_SCAN = 'barcode' | 'qrcode'

const ICONS: { [key in TYPES_SCAN]: SVGElement } = {
  barcode: IconBarCode,
  qrcode: IconQrCode,
}

const TYPE_TITLES: { [key in TYPES_SCAN]: string } = {
  barcode: 'Bar Code',
  qrcode: 'QR',
}

export default Vue.extend({
  name: 'ScanForm',
  components: {
    Reader,
    Input,
    Button,
    ZXingCoder,
    MozScanner,
    ScanbotSDK,
    DynamicSoftScanner,
    IconBarCode,
    IconQrCode,
  },
  props: {
    title: {
      type: String,
      default: 'Scanner',
    },
    type: {
      type: String as PropType<TYPES_SCAN>,
      default: 'barcode',
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      active: false,
      barcodes: [
        'code_128_reader',
        'ean_reader',
        'ean_8_reader',
        'code_39_reader',
        'code_39_vin_reader',
        'codabar_reader',
      ],
    }
  },
  computed: {
    getIcon(): SVGElement {
      return ICONS[this.type as TYPES_SCAN]
    },
    getTitle(): string {
      return TYPE_TITLES[this.type as TYPES_SCAN]
    },
    isBarCode(): boolean {
      return this.type === 'barcode'
    },
    model: {
      get(): string {
        return this.value
      },
      set(value: string): void {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    onDecode(e: string) {
      if (e) {
        this.$emit('input', e)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.scan-form {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid $b-secondary;
  padding: 1.5rem 1.8rem;
  border-radius: 2rem;
  transition: 0.3s;

  &__barcode {
    margin-bottom: 1rem;
  }

  &--active {
    border-color: $b-primary;
  }

  &__btn {
    width: 100%;
    margin-bottom: 1rem;
  }

  &__btn-inner {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  &__icon {
    width: 1.8rem;
    height: 1.8rem;

    path {
      fill: $f-light;
    }
  }

  &__scanner {
    margin-bottom: 1rem;
  }
}

.scanner {
  width: 100%;

  ::v-deep video {
    width: 100%;
    position: relative !important;
  }

  ::v-deep canvas {
    width: 100%;
  }
}
</style>
