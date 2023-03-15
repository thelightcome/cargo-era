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
  methods: {
    onSubmit(data: ILoginUserDto) {
      const res = this.$auth.loginWith('local', {
        data: {
          username: data.login,
          password: data.password,
          rememberMe: true,
        },
      })
      // const res = this.$repositories.auth.register(data)
      console.log(res)
    },
    getRespawnCode(login: string) {
      const res = this.$repositories.auth.getRespawnCode(login)
      console.log(res)

      this.$router.push(this.localePath('/auth/respawn'))
    },
  },
})
</script>

<style lang="scss" scoped>
.login-form {
  margin-bottom: 20px;
}
</style>
