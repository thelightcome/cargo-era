<template>
  <form class="form" @submit.prevent="">
    <Input
      id="email"
      v-model="email"
      label="Email"
      name="email"
      icon="text"
      type="email"
      :disabled="false"
      :error="emailError"
      class="form__field"
      @onBlur="onBlur('email')"
    />
    <div v-show="email && !emailError" class="form__respawn">
      <button class="form__respawn-btn" @click="$emit('respawn', email)">
        respawn
      </button>
    </div>
    <Input
      id="password"
      v-model="password"
      label="Password"
      name="password"
      icon="password"
      type="password"
      :disabled="false"
      :error="passwordError"
      class="form__field"
      @onBlur="onBlur('password')"
    />
    <div class="form__field form__field--btn">
      <Button
        class="form__button"
        :disabled="!isFilled || isHasError"
        @click="onSubmit"
      >
        Send
      </Button>
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
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      errors: {
        required: this.$tc('required'),
        max: this.$tc('max'),
      },
    }
  },
  computed: {
    isFilled(): boolean {
      return !!(this.email && this.password)
    },
    isHasError(): boolean {
      return !!(this.emailError || this.passwordError)
    },
    getParseData(): ILoginUserDto {
      return {
        email: this.email,
        password: this.password,
      }
    },
  },
  methods: {
    onBlur(type: string) {
      this.check(type)
    },
    check(type?: string) {
      if (!type || type === 'email')
        this.emailError = this.$services.formValidation.getError(
          this.$services.formValidation.email(this.email),
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
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px 30px;
  font-family: $family-2;

  &__field {
    flex-grow: 1;

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
