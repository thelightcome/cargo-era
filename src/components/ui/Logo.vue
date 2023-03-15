<template>
  <NuxtLink to="/" class="logo"> Cargo </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: '',
})
</script>

<style lang="scss" scoped>
.logo {
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: $l-6xl;
  color: $f-light;
}
</style>
