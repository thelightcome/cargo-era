<template>
  <div class="user-password" :class="{ edit }">
    <h4 class="user-password__title">
      <span>Change Password</span>
      <Button
        :variant="edit ? 'outlined' : 'filled'"
        class="user-password__edit-btn"
        @click="clickEdit"
      >
        <IconPen v-show="!edit" />
        <IconClose v-show="edit" />
      </Button>
    </h4>
    <div v-show="edit" class="user-password__row">
      <Input
        id="password"
        v-model="password"
        label="Password"
        name="password"
        icon="password"
        type="password"
        variant="transparent"
        :error="passwordError"
        class="user-password__field"
        @onBlur="onBlur('password')"
      />
      <Input
        id="newPassword"
        v-model="newPassword"
        label="New Password"
        name="newPassword"
        icon="password"
        type="password"
        variant="transparent"
        :error="newPasswordError"
        class="user-password__field"
        @onBlur="onBlur('newPassword')"
      />
    </div>
    <div v-if="edit" class="user-password__row user-password__row--btn">
      <Button @click="onSubmit">Send</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import IconPen from 'icons/pen.svg?inline'
import IconClose from 'icons/close.svg?inline'

import Input from 'components/ui/Input.vue'
import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'UserPassword',
  components: { IconPen, IconClose, Input, Button },
  data() {
    return {
      edit: false,
      password: '',
      passwordError: '',
      newPassword: '',
      newPasswordError: '',
      errors: {
        required: this.$tc('required'),
        min: this.$tc('min'),
        max: this.$tc('max'),
        password: this.$tc('password'),
        sameText: this.$tc('sameText'),
      },
    }
  },
  computed: {
    isHasError(): boolean {
      return !!(this.passwordError || this.newPasswordError)
    },
  },
  methods: {
    clickEdit() {
      this.edit = !this.edit
    },
    onBlur(type: string) {
      this.check(type)
    },
    check(type?: string) {
      if (!type || type === 'password')
        this.passwordError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.password),
          this.errors
        )
      if (!type || type === 'newPassword')
        this.newPasswordError = this.$services.formValidation.getError(
          this.$services.formValidation.password(this.newPassword),
          this.errors
        )
    },
    async onSubmit() {
      this.check()
      if (this.isHasError) return
      try {
        this.$nuxt.$loading.start()
        await this.$repositories.user.changePassword({
          currentPassword: this.password,
          newPassword: this.newPassword,
        })
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
.user-password {
  position: relative;
  border-radius: 3rem;
  border: 1px solid transparent;
  transition: 0.3s;
  padding: 0.6rem 1rem;
  padding-bottom: 0.8rem;

  &.edit {
    border: 1px solid $b-primary;
  }

  &__title {
    margin: 0;
    font-size: 1rem;
    color: $f-dark;
    padding: 0 1rem;
    margin-bottom: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 1.5rem;
    position: absolute;
    background: $bg-main;
    transform: translateY(-1.4rem);
  }

  &__edit-btn {
    box-sizing: border-box;
    padding: 0.3rem;
    z-index: 1;

    svg {
      display: block;
      width: 0.7rem;
      height: 0.7rem;
    }
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
