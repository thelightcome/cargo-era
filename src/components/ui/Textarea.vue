<template>
  <div class="textarea" :class="{ focus, disabled, error }">
    <label :for="id" class="textarea__label" :class="{ active: value }">{{
      label
    }}</label>
    <label class="textarea__body">
      <textarea
        :id="id"
        ref="textarea"
        v-model="model"
        class="textarea__input"
        :disabled="disabled"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      ></textarea>
    </label>
    <div v-show="!focus && error" class="textarea__error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Textarea',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
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
  },
  data() {
    return {
      focus: false,
    }
  },
  computed: {
    model: {
      get(): string {
        return this.value
      },
      set(value: string): void {
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    this.resize()
  },
  methods: {
    onKeydown(e: KeyboardEvent) {
      this.$emit('onKeydown', e)
      this.resize()
    },
    onFocus(e: FocusEvent) {
      this.focus = true
      this.$emit('onFocus', e)
    },
    onBlur(e: FocusEvent) {
      this.focus = false
      this.$emit('onBlur', e)
    },
    resize() {
      const textarea = this.$refs.textarea as HTMLTextAreaElement
      if (textarea.scrollHeight > textarea.clientHeight)
        textarea.style.height = textarea.scrollHeight - 4 + 'px'
    },
  },
})
</script>

<style lang="scss" scoped>
.textarea {
  position: relative;
  width: 100%;
  padding-top: 20px;

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

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
    font-size: $f-base;
    font-family: $family-2;
    letter-spacing: 0.05rem;
    flex-grow: 1;
    margin-right: 0.6rem;
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
