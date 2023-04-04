<template>
  <div class="tab">
    <div class="tab__heads">
      <button
        v-for="(head, headInd) in heads"
        :key="headInd"
        class="tab__head"
        :class="{ 'tab__head--active': current === headInd }"
        @click="select(headInd)"
      >
        {{ $tc(head) }}
      </button>
    </div>
    <div class="tab__body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
  name: 'Tab',
  props: {
    heads: {
      type: Array as PropType<string[]>,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  methods: {
    select(index: number) {
      this.$emit('select', this.heads[index])
    },
  },
})
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  &__heads {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: stretch;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    height: 2rem;
    overflow: hidden;
  }

  &__head {
    flex-grow: 1;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
    cursor: pointer;
    background: $bg-primary;
    color: $f-light;
    transition: 0.3s;

    &:first-child {
      border-top-left-radius: 0.5rem;
    }

    &:last-child {
      border-top-right-radius: 0.5rem;
    }

    &:not(:last-child) {
      border-right: 1px solid #02020222;
    }

    &--active {
      background: transparent;
      border-color: $b-primary;
      color: $f-primary;
    }
  }

  &__body {
    width: 100%;
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>
