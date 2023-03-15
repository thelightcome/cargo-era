<template>
  <form class="form" @submit.prevent="">
    <Input
      id="code"
      v-model="code"
      label="Code"
      icon="text"
      type="text"
      :disabled="false"
      :error="codeError"
      class="form__field"
      @onBlur="onBlur('code')"
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

import { IRespawnUserDto } from 'types/auth.types'

import Input from 'components/ui/Input.vue'
import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'RespawnForm',
  components: { Input, Button },
  data() {
    return {
      code: '',
      codeError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      errors: {
        required: this.$tc('required'),
        password: this.$tc('password'),
        sameText: this.$tc('sameText'),
      },
    }
  },
  computed: {
    isHasError(): boolean {
      return !!(
        this.codeError ||
        this.passwordError ||
        this.confirmPasswordError
      )
    },
    getParseData(): IRespawnUserDto {
      return {
        code: this.code,
        password: this.password,
      }
    },
  },
  methods: {
    onBlur(type: string) {
      this.check(type)
    },
    check(type?: string) {
      if (!type || type === 'code')
        this.codeError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.code),
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
