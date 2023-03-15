<template>
  <div class="dropdown" :class="{ 'dropdown--active': active }">
    <div class="dropdown__head" @click="$emit('toggle')">
      <slot name="head"></slot>
    </div>
    <TransitionExpand>
      <div v-if="active">
        <slot name="body"></slot>
      </div>
    </TransitionExpand>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import TransitionExpand from 'components/ui/TransitionExpand.vue'

export default Vue.extend({
  name: 'DropDown',
  components: { TransitionExpand },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.dropdown {
  &__head {
    border-bottom: 1px solid transparent;
    transition: 0.3s;
  }

  &--active &__head {
    border-color: rgba($b-dark, 0.4);
  }
}
</style>
