<template>
  <div class="page">
    <div class="container flex-col">
      <h1>Respawn</h1>
      <RespawnForm class="respawn-form" @onSubmit="onSubmit" />
      <NuxtLink :to="localePath('/auth')">Login</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IRespawnUserDto } from 'types/auth.types'

import RespawnForm from 'components/auth/RespawnForm.vue'

export default Vue.extend({
  name: 'PageRespawn',
  components: { RespawnForm },
  layout: 'auth',
  methods: {
    onSubmit(data: IRespawnUserDto) {
      const res = this.$repositories.auth.respawn(data)
      console.log(data, res)
    },
  },
})
</script>

<style lang="scss" scoped>
.respawn-form {
  margin-bottom: 20px;
}
</style>
