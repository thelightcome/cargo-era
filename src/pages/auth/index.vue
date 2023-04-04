<template>
  <div class="page">
    <div class="container flex-col">
      <h1>Login</h1>
      <LoginForm
        class="login-form"
        @onSubmit="onSubmit"
        @respawn="getRespawnCode"
      />
      <NuxtLink :to="localePath('/auth/register')">Register</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ILoginUserDto } from 'types/auth.types'

import LoginForm from 'components/auth/LoginForm.vue'

export default Vue.extend({
  name: 'PageLogin',
  components: { LoginForm },
  layout: 'auth',
  mounted() {
    if (typeof this.$route?.query?.key === 'string')
      this.activate(this.$route.query.key as string)
  },
  methods: {
    async onSubmit(data: ILoginUserDto) {
      try {
        this.$nuxt.$loading.start()
        await this.$auth.loginWith('local', {
          data: {
            email: data.email,
            password: data.password,
            rememberMe: true,
          },
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
    async getRespawnCode(email: string) {
      try {
        this.$nuxt.$loading.start()
        await this.$repositories.auth.getRespawnCode(email)
        this.$router.push(
          this.localePath(`/auth/respawn?email=${encodeURI(email)}`)
        )
      } catch (err: any) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          message: this.$tc(err.error),
        })
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async activate(key: string) {
      try {
        await this.$repositories.auth.activate(key)
        this.$store.dispatch('toast/setToast', {
          type: 'valid',
          message: 'Email was activated',
        })
      } catch (err: any) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          message: this.$tc(err.error),
        })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.login-form {
  margin-bottom: 20px;
}
</style>
