<template>
  <div class="page">
    <div class="container flex-col">
      <h1>Register</h1>
      <RegisterForm class="register-form" @onSubmit="onSubmit" />
      <NuxtLink :to="localePath('/auth')">Login</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ICreateUserDto } from 'types/auth.types'

import RegisterForm from 'components/auth/RegisterForm.vue'

export default Vue.extend({
  name: 'PageRegister',
  components: { RegisterForm },
  layout: 'auth',
  methods: {
    async onSubmit(data: ICreateUserDto) {
      try {
        this.$nuxt.$loading.start()
        await this.$repositories.auth.register(data)
        this.$store.dispatch('toast/setToast', {
          type: 'valid',
          message: 'Link for validation your email was sended to your email!',
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
.register-form {
  margin-bottom: 20px;
}
</style>
