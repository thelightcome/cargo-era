<template>
  <ClientOnly>
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <slot />
    </transition>
  </ClientOnly>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TransitionExpand',
  methods: {
    enter(element: HTMLDivElement) {
      const width = getComputedStyle(element).width
      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'
      const height = getComputedStyle(element).height
      element.style.width = ''
      element.style.position = ''
      element.style.visibility = ''
      element.style.height = '0'

      console.log(getComputedStyle(element)?.height)

      requestAnimationFrame(() => {
        element.style.height = height
      })
    },
    afterEnter(element: HTMLDivElement) {
      element.style.height = 'auto'
    },
    leave(element: HTMLDivElement) {
      const height = getComputedStyle(element).height
      element.style.height = height

      console.log(getComputedStyle(element)?.height)

      requestAnimationFrame(() => {
        element.style.height = '0'
      })
    },
  },
})
</script>

<style scoped>
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s linear;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>
