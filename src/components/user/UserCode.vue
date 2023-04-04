<template>
  <div v-if="getCode" class="user-code" @click="click">
    <IconPen class="icon" /> {{ getCode }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import IconPen from 'icons/pen.svg?inline'

export default Vue.extend({
  name: 'UserCode',
  components: { IconPen },
  computed: {
    getCode(): string {
      return ''
    },
  },
  methods: {
    click() {
      navigator.clipboard.writeText(this.getCode)
    },
  },
})
</script>

<style lang="scss" scoped>
.user-code {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  color: $f-light;
  border: 1px solid $b-light;
  padding: 0.3rem;
  cursor: pointer;

  .icon {
    width: 1rem;
    height: 1rem;

    path {
      fill: $f-light;
    }
  }
}
</style>
