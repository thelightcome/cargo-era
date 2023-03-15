<template>
  <form class="form" @submit.prevent="">
    <Input
      id="login"
      v-model="login"
      label="Login or Email"
      icon="text"
      type="text"
      :disabled="false"
      :error="loginError"
      class="form__field"
      @onBlur="onBlur('login')"
    />
    <div v-show="login && !loginError" class="form__respawn">
      <button class="form__respawn-btn" @click="$emit('respawn', login)">
        respawn
      </button>
    </div>
    <Input
      id="password"
      v-model="password"
      label="Password"
      icon="password"
      type="password"
      :disabled="false"
      :error="passwordError"
      class="form__field"
      @onBlur="onBlur('password')"
    />
    <div class="form__field form__field--btn">
      <Button class="form__button" @click="onSubmit">Send</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import { ILoginUserDto } from 'types/auth.types'

import Input from 'components/ui/Input.vue'
import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'RegisterForm',
  components: { Input, Button },
  data() {
    return {
      login: '',
      loginError: '',
      password: '',
      passwordError: '',
      errors: {
        required: this.$tc('required'),
        max: this.$tc('max'),
      },
    }
  },
  computed: {
    isHasError(): boolean {
      return !!(this.loginError || this.passwordError)
    },
    getParseData(): ILoginUserDto {
      return {
        login: this.login,
        password: this.password,
      }
    },
  },
  methods: {
    onBlur(type: string) {
      this.check(type)
    },
    check(type?: string) {
      if (!type || type === 'login')
        this.loginError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.login),
          this.errors
        )
      if (!type || type === 'password')
        this.passwordError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.password),
          this.errors
        )
    },
    onSubmit() {
      this.check()
      if (this.isHasError) return
      this.$emit('onSubmit', this.getParseData)
    },
  },
})
</script>

<style lang="scss" scoped>
.form {
  max-width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px 30px;
  font-family: $family-2;

  &__field {
    flex-grow: 1;

    @include tablet {
      max-width: 46%;
    }

    &--btn {
      display: flex;
      padding-top: 20px;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
  }

  &__button {
    width: 100%;

    @include tablet {
      max-width: 60%;
    }
  }

  &__respawn {
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  &__respawn-btn {
    position: absolute;
    left: 10px;
    bottom: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
}
</style>
