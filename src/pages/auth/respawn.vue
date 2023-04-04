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
    async onSubmit(data: IRespawnUserDto) {
      try {
        this.$nuxt.$loading.start()
        await this.$repositories.auth.respawn(data)
        this.$router.push(this.localePath(`/auth`))
        this.$store.dispatch('toast/setToast', {
          type: 'valid',
          message: 'Email was activated',
        })
      } catch (err: any) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          message: this.$tc(err.error),
        })
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.respawn-form {
  margin-bottom: 20px;
}
</style>
