<template>
  <div class="product-list">
    <DropDown
      v-for="(item, itemInd) in list"
      :key="itemInd"
      :active="current === itemInd"
      :class="{ 'dropdown--snd': itemInd % 2 === 0 }"
      @toggle="toggle(itemInd)"
    >
      <template #head>
        <div class="dropdown__head">
          <span>{{ item.trackCode }}</span>
        </div>
      </template>
      <template #body>
        <div class="dropdown__body">
          <div
            v-for="(detail, detailInd) in item.productDetails"
            :key="detailInd"
            class="dropdown__item"
          >
            <div class="dropdown__icon">
              <IconCheckMark />
            </div>
            <div class="dropdown__desc">
              <div>{{ detail.branchDescription }}</div>
              <div>{{ detail.createdDate }}</div>
            </div>
          </div>
        </div>
      </template>
    </DropDown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

import IconCheckMark from 'icons/check-mark.svg?inline'

import { IProduct } from 'types/product.types'

import DropDown from 'components/ui/DropDown.vue'

export default Vue.extend({
  name: 'ProductList',
  components: { DropDown, IconCheckMark },
  props: {
    list: {
      type: Array as PropType<IProduct[]>,
      required: true,
    },
  },
  data() {
    return {
      current: null as number | null,
    }
  },
  methods: {
    toggle(ind: number) {
      if (this.current === ind) return (this.current = null)
      this.current = ind
    },
  },
})
</script>

<style lang="scss" scoped>
.product-list {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  @include style-scroll;
}

.dropdown {
  &--snd {
    background: $b-secondary;
  }

  &__head {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.6rem;
    font-size: $f-lg;
    font-weight: bold;
    cursor: pointer;
  }

  &__body {
    width: 100%;
    box-sizing: border-box;
    padding-top: 0.5rem;
    padding-left: 1.5rem;
    padding-bottom: 0.5rem;
  }

  &__item {
    margin-bottom: 0.8rem;
    display: flex;
  }

  &__icon {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: $bg-success;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 0.9rem;
      height: 0.9rem;

      path {
        fill: $f-light;
      }
    }
  }

  &__desc {
    :first-child {
      font-weight: bold;
      opacity: 0.8;
    }
  }
}
</style>
