<template>
  <div v-if="isActive" class="toasts" @click.stop="toastClose">
    <TransitionGroup tag="div" class="toasts__list" name="toast">
      <div
        v-for="(toast, toastId) in getToast"
        :key="toastId"
        class="toast"
        :class="{ [toast.type]: true }"
      >
        <div class="toast__title">{{ getTitle(toast.type) || 'sdvsdvs' }}</div>
        <div>
          {{ toast.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IToast } from 'types/toast.types'

export default Vue.extend({
  name: 'Toast',
  computed: {
    getToast(): IToast[] {
      return this.$store.getters['toast/getToast']
    },
    isActive(): boolean {
      return this.$store.getters['toast/isActive']
    },
  },
  watch: {
    getToast() {
      if (!this.getToast.length) this.toastClose()
    },
  },
  methods: {
    getTitle(type: string = 'info'): string {
      return this.$tc(`toasts.titles.${type}`)
    },
    toastClose() {
      this.$store.commit('toast/SET_ACTIVE', false)
    },
  },
})
</script>

<style lang="scss" scoped>
.toasts {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 20%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  padding-bottom: 30%;

  &__list {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}

.toast {
  width: 80%;
  max-width: 450px;
  box-sizing: border-box;
  border-radius: 20px;
  min-height: 100px;
  padding: 8px 20px 35px;
  background: $bg-main;
  margin-bottom: 15px;
  border: 1px solid transparent;
  box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.2);

  &__title {
    margin-bottom: 1rem;
    font-weight: bold;
    text-align: center;
    font-size: $l-lg;
  }

  &.error {
    border-color: $b-error;
  }

  &.error &__title {
    color: $f-error;
  }

  &.valid {
    border-color: $b-success;
  }

  &.valid &__title {
    color: $f-success;
  }

  &.info {
    border-color: $b-primary;
  }

  &.info &__title {
    color: $f-primary;
  }
}
</style>
