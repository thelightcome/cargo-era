<template>
  <form class="form" @submit.prevent="">
    <Input
      id="login"
      v-model="login"
      label="Login"
      icon="text"
      type="text"
      :disabled="false"
      :error="loginError"
      class="form__field"
      @onBlur="onBlur('login')"
    />
    <Input
      id="email"
      v-model="email"
      label="Email"
      icon="email"
      type="email"
      :disabled="false"
      :error="emailError"
      class="form__field"
      @onBlur="onBlur('email')"
    />
    <Input
      id="firstname"
      v-model="firstname"
      label="First Name"
      icon="text2"
      type="text"
      :disabled="false"
      :error="firstnameError"
      class="form__field"
      @onBlur="onBlur('firstname')"
    />
    <Input
      id="lastname"
      v-model="lastname"
      label="Last Name"
      icon="text2"
      type="text"
      :disabled="false"
      :error="lastnameError"
      class="form__field"
      @onBlur="onBlur('lastname')"
    />
    <Input
      id="tel"
      v-model="tel"
      label="Phone Number"
      icon="tel"
      type="tel"
      :mask="'+7 (###) ###-##-##'"
      :disabled="false"
      :error="telError"
      class="form__field"
      @onBlur="onBlur('tel')"
    />
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
    <Input
      id="confirmPassword"
      v-model="confirmPassword"
      label="Confirm Password"
      icon="password"
      type="password"
      :disabled="false"
      :error="confirmPasswordError"
      class="form__field"
      @onBlur="onBlur('confirmPassword')"
    />
    <div class="form__field form__field--btn">
      <Button class="form__button" @click="onSubmit">Send</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import { ICreateUserDto } from 'types/auth.types'

import Input from 'components/ui/Input.vue'
import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'RegisterForm',
  components: { Input, Button },
  data() {
    return {
      login: '',
      loginError: '',
      email: '',
      emailError: '',
      firstname: '',
      firstnameError: '',
      lastname: '',
      lastnameError: '',
      tel: '',
      telError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      errors: {
        required: this.$tc('required'),
        isEmail: this.$tc('isEmail'),
        min: this.$tc('min'),
        max: this.$tc('max'),
        password: this.$tc('password'),
        sameText: this.$tc('sameText'),
        isPhone: this.$tc('isPhone'),
      },
    }
  },
  computed: {
    isHasError(): boolean {
      return !!(
        this.loginError ||
        this.emailError ||
        this.firstnameError ||
        this.lastnameError ||
        this.telError ||
        this.passwordError ||
        this.confirmPasswordError
      )
    },
    getParseData(): ICreateUserDto {
      return {
        login: this.login,
        firstName: this.firstname,
        tel: this.tel,
        lastName: this.lastname,
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
      if (!type || type === 'login')
        this.loginError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.login),
          this.errors
        )
      if (!type || type === 'email')
        this.emailError = this.$services.formValidation.getError(
          this.$services.formValidation.email(this.email),
          this.errors
        )
      if (!type || type === 'firstname')
        this.firstnameError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.firstname),
          this.errors
        )
      if (!type || type === 'lastname')
        this.lastnameError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.lastname),
          this.errors
        )
      if (!type || type === 'tel')
        this.telError = this.$services.formValidation.getError(
          this.$services.formValidation.phone(this.tel),
          this.errors
        )
      if (!type || type === 'password')
        this.passwordError = this.$services.formValidation.getError(
          this.$services.formValidation.password(this.password),
          this.errors
        )
      if (!type || type === 'confirmPassword')
        this.confirmPasswordError = this.$services.formValidation.getError(
          this.$services.formValidation.confirmPassword(
            this.confirmPassword,
            this.password
          ),
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
}
</style>
