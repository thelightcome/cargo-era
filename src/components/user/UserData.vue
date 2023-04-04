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
        id="firstname"
        v-model="firstname"
        label="First Name"
        name="firstname"
        :auto="false"
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
        name="lastname"
        :icon="edit ? 'text2' : ''"
        variant="transparent"
        type="text"
        :auto="false"
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
        :auto="false"
        name="email"
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
        id="phoneNumber"
        v-model="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        :icon="edit ? 'phoneNumber' : ''"
        variant="transparent"
        :auto="false"
        type="tel"
        :mask="'+7 (###) ###-##-##'"
        :disabled="!edit"
        :error="edit ? phoneNumberError : ''"
        class="user-data__field"
        @onBlur="onBlur('phoneNumber')"
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
      email: this.userData.email || '',
      emailError: '',
      firstname: this.userData.firstName || '',
      firstnameError: '',
      lastname: this.userData.lastName || '',
      lastnameError: '',
      phoneNumber: this.userData.phoneNumber || '',
      phoneNumberError: '',
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
        this.emailError ||
        this.firstnameError ||
        this.lastnameError ||
        this.phoneNumberError
      )
    },
    getParseData(): IUserData {
      return {
        firstName: this.firstname,
        phoneNumber: this.phoneNumber.replace(/[^\d]/g, ''),
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
      this.email = this.userData.email || ''
      this.firstname = this.userData.firstName || ''
      this.lastname = this.userData.lastName || ''
      this.phoneNumber = this.userData.phoneNumber || ''
    },
    onBlur(type: string) {
      this.check(type)
    },
    check(type?: string) {
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
      if (!type || type === 'phoneNumber')
        this.phoneNumberError = this.$services.formValidation.getError(
          this.$services.formValidation.phone(this.phoneNumber),
          this.errors
        )
    },
    async onSubmit() {
      this.check()
      if (this.isHasError) return
      try {
        this.$nuxt.$loading.start()
        await this.$repositories.user.changeData(
          this.$services.filterObject({
            firstName: this.firstname,
            lastName: this.lastname,
            phoneNumber: this.phoneNumber,
            email: this.email,
          }) as IUserData
        )
        await this.$auth.fetchUser()
        this.edit = false
        this.$store.dispatch('toast/setToast', {
          type: 'valid',
          message: 'User data was changed',
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
