<template>
  <div class="page">
    <div class="container flex-col">
      <h1>Register</h1>
      <RegisterForm class="register-form" @onSubmit="onSubmit" />
      <NuxtLink :to="localePath('/auth')">Login</NuxtLink>
      <div></div>
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
    onSubmit(data: ICreateUserDto) {
      const res = this.$repositories.auth.register(data)
      console.log(res)
      // if (res?.status === 201) {
      //   this.$router.push(this.localePath('/auth'))
      // }
    },
  },
})
</script>

<style lang="scss" scoped>
.register-form {
  margin-bottom: 20px;
}
</style>
