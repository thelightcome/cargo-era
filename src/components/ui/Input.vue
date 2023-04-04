<template>
  <div class="field" :class="{ focus, disabled, error, [variant]: true }">
    <label
      v-if="label"
      :for="id"
      class="field__label"
      :class="{ active: value }"
      >{{ label }}</label
    >
    <label class="field__body">
      <input
        :id="id"
        v-model="model"
        v-mask="mask"
        :name="name"
        :type="type"
        class="field__input"
        :disabled="disabled"
        :autocomplete="auto ? 'on' : 'off'"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      />
      <template v-if="curIcon">
        <component :is="curIcon" class="field__icon" />
      </template>
    </label>
    <div v-show="!focus && error" class="field__error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

import IconMagniGlass from 'icons/magni-glass.svg?inline'
import IconUser from 'icons/user.svg?inline'
import IconPen from 'icons/pen.svg?inline'
import IconEmail from 'icons/email.svg?inline'
import IconPhoneNumber from 'icons/tel.svg?inline'
import IconLock from 'icons/lock.svg?inline'

export type TypeInput = 'text' | 'email' | 'password' | 'tel' | 'search'

export type TypeIcon =
  | 'text'
  | 'text2'
  | 'email'
  | 'password'
  | 'phoneNumber'
  | 'search'

export type IIcons = { [key in TypeIcon]: SVGElement }

export type IVariant = 'filled' | 'transparent'

const ICONS: IIcons = {
  text: IconPen,
  text2: IconUser,
  email: IconEmail,
  password: IconLock,
  phoneNumber: IconPhoneNumber,
  search: IconMagniGlass,
}

export default Vue.extend({
  name: 'Input',
  components: {
    IconMagniGlass,
    IconUser,
    IconPen,
    IconEmail,
    IconPhoneNumber,
    IconLock,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    auto: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<TypeInput>,
      default: 'text',
    },
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    icon: {
      type: String as PropType<TypeIcon>,
      default: '',
    },
    mask: {
      type: String,
      default: '',
    },
    variant: {
      type: String as PropType<IVariant>,
      default: 'filled',
    },
  },
  data() {
    return {
      focus: false,
      icons: ICONS,
    }
  },
  computed: {
    curIcon(): undefined | SVGElement {
      return this.icons[this.icon as TypeIcon]
    },
    model: {
      get(): string {
        return this.value
      },
      set(value: string): void {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    onKeydown(e: KeyboardEvent) {
      this.$emit('onKeydown', e)
    },
    onFocus(e: FocusEvent) {
      this.focus = true
      this.$emit('onFocus', e)
    },
    onBlur(e: FocusEvent) {
      this.focus = false
      this.$emit('onBlur', e)
    },
  },
})
</script>

<style lang="scss" scoped>
.field {
  position: relative;
  width: 100%;
  padding-top: 20px;
  font-size: $f-base;
  font-family: $family-2;

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 10px;
    font-size: $f-base;
    font-family: inherit;
    z-index: 1;
    transform: translateY(26px);
    transition: all 0.2s linear;
  }

  &.focus &__label,
  &__label.active {
    font-size: $f-3xs;
    transform: translateY(0);
  }

  &__body {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px 6px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background: $bg-light;

    &::after,
    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
    }

    &::before {
      width: 100%;
      background: $bg-secondary;
    }

    &::after {
      width: 0%;
      background: $bg-primary;
      z-index: 1;
      transition: width 0.5s ease-in-out;
    }
  }

  &.transparent &__body {
    background: transparent;
  }

  &.error &__body {
    &::after {
      background: $bg-error;
    }
  }

  &.focus &__body {
    &::after {
      width: 100%;
    }
  }

  &__input {
    width: 100%;
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    letter-spacing: 0.05rem;
    flex-grow: 1;
    margin-right: 0.6rem;
    appearance: none;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
  }

  &__error {
    margin-top: 5px;
    padding: 0 8px 10px;
    font-size: $f-xs;
    font-family: $family-2;
    color: $f-error;
  }
}
</style>
