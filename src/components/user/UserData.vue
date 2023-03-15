<template>
  <div class="user-data" :class="{ edit }">
    <h4 class="user-data__title">
      <span>User Data</span>
      <Button
        :variant="edit ? 'outlined' : 'filled'"
        class="user-data__edit-btn"
        @click="clickEdit"
      >
        <IconPen v-show="!edit" />
        <IconClose v-show="edit" />
      </Button>
    </h4>
    <div class="user-data__row">
      <Input
        id="login"
        v-model="login"
        label="Login"
        :icon="edit ? 'text' : ''"
        variant="transparent"
        type="text"
        :disabled="!edit"
        :error="edit ? loginError : ''"
        class="user-data__field"
        @onBlur="onBlur('login')"
      />
    </div>
    <div class="user-data__row">
      <Input
        id="firstname"
        v-model="firstname"
        label="First Name"
        :icon="edit ? 'text2' : ''"
        variant="transparent"
        type="text"
        :disabled="!edit"
        :error="edit ? firstnameError : ''"
        class="user-data__field"
        @onBlur="onBlur('firstname')"
      />
      <Input
        id="lastname"
        v-model="lastname"
        label="Last Name"
        :icon="edit ? 'text2' : ''"
        variant="transparent"
        type="text"
        :disabled="!edit"
        :error="edit ? lastnameError : ''"
        class="user-data__field"
        @onBlur="onBlur('lastname')"
      />
    </div>
    <div class="user-data__row">
      <Input
        id="email"
        v-model="email"
        label="Email"
        :icon="edit ? 'email' : ''"
        variant="transparent"
        type="email"
        :disabled="!edit"
        :error="edit ? emailError : ''"
        class="user-data__field"
        @onBlur="onBlur('email')"
      />
    </div>
    <div class="user-data__row">
      <Input
        id="tel"
        v-model="tel"
        label="Phone Number"
        :icon="edit ? 'tel' : ''"
        variant="transparent"
        type="tel"
        :mask="'+7 (###) ###-##-##'"
        :disabled="!edit"
        :error="edit ? telError : ''"
        class="user-data__field"
        @onBlur="onBlur('tel')"
      />
    </div>
    <div v-show="edit" class="user-data__row user-data__row--btn">
      <Button @click="onSubmit">Send</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import IconPen from 'icons/pen.svg?inline'
import IconClose from 'icons/close.svg?inline'

import { IUserData } from 'types/auth.types'

import Input from 'components/ui/Input.vue'
import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'UserData',
  components: { IconPen, IconClose, Input, Button },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      edit: false,
      login: this.userData.login || '',
      loginError: '',
      email: this.userData.email || '',
      emailError: '',
      firstname: this.userData.firstName || '',
      firstnameError: '',
      lastname: this.userData.lastName || '',
      lastnameError: '',
      tel: this.userData.tel || '',
      telError: '',
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
        this.telError
      )
    },
    getParseData(): IUserData {
      return {
        login: this.login,
        firstName: this.firstname,
        tel: this.tel,
        lastName: this.lastname,
        email: this.email,
      }
    },
  },
  methods: {
    clickEdit() {
      if (this.edit) {
        this.setUserData()
      }
      this.edit = !this.edit
    },
    setUserData() {
      this.login = this.userData.login || ''
      this.email = this.userData.email || ''
      this.firstname = this.userData.firstName || ''
      this.lastname = this.userData.lastName || ''
      this.tel = this.userData.tel || ''
    },
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
    },
    async onSubmit() {
      this.check()
      if (this.isHasError) return

      await this.$repositories.user.changeData(
        this.$services.filterObject({
          login: this.login,
          firstName: this.firstname,
          lastName: this.lastname,
          tel: this.tel,
          email: this.email,
        }) as IUserData
      )
      await this.$auth.fetchUser()
      this.edit = false
    },
  },
})
</script>

<style lang="scss" scoped>
.user-data {
  position: relative;
  border-radius: 3rem;
  border: 1px solid $b-secondary;
  transition: 0.3s;
  padding: 0.6rem 1rem;
  padding-bottom: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  &.edit {
    border: 1px solid $b-primary;
  }

  &__title {
    margin: 0;
    font-size: 1.4rem;
    color: $f-dark;
    padding-left: 2rem;
    margin-bottom: 0.8rem;

    span {
      position: absolute;
      padding: 0 1rem;
      background: $bg-main;
      transform: translateY(-1.4rem);
    }
  }

  &__edit-btn {
    position: absolute;
    box-sizing: border-box;
    padding: 0.3rem;
    right: 3rem;
    z-index: 1;
    transform: translateY(-1.2rem);

    svg {
      display: block;
      width: 0.7rem;
      height: 0.7rem;
    }
  }

  &.edit &__edit-btn {
    background: $bg-main;
  }

  &__row {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0.8rem 1.8rem;
    margin-bottom: 0.8rem;

    &--btn {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
  }
}
</style>
