<template>
  <component
    :is="tag"
    :[link]="href"
    class="btn"
    :class="{
      ['btn--' + version]: true,
      ['btn--' + variant]: true,
    }"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

type TagType = 'button' | 'NuxtLink' | 'a'
type VariantType = 'transparent' | 'outlined' | 'filled'
type VersionType = 'primary' | 'secondary' | 'danger' | 'success'

export default Vue.extend({
  name: 'Button',
  props: {
    tag: {
      type: String as PropType<TagType>,
      default: 'button',
    },
    href: {
      type: String,
      default: '',
    },
    version: {
      type: String as PropType<VersionType>,
      default: 'primary',
      validator(v: VersionType) {
        return ['primary', 'secondary', 'danger', 'success'].includes(v)
      },
    },
    variant: {
      type: String as PropType<VariantType>,
      default: 'filled',
      validator(v: VariantType) {
        return ['filled', 'transparent', 'outlined'].includes(v)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link() {
      return this.tag === 'a' ? 'href' : this.tag === 'NuxtLink' ? 'to' : ''
    },
  },
  methods: {
    onClick(e: PointerEvent): void {
      this.$emit('click', e)
    },
  },
})
</script>

<style lang="scss" scoped>
.btn {
  margin: 0;
  box-sizing: border-box;
  padding: 8px 30px;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  letter-spacing: 0.05rem;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 5px;
  text-transform: uppercase;
  text-decoration: none;

  &--primary {
    background: $bg-primary;
    border-color: $b-primary;
    color: $f-light;

    rect,
    path {
      fill: $f-light;
    }
  }

  &--primary.btn-transparent,
  &--primary.btn--outlined {
    color: $f-primary;

    rect,
    path {
      fill: $f-primary;
    }
  }

  &--secondary {
    background: $bg-secondary;
    border-color: $b-secondary;
    color: $f-dark;

    rect,
    path {
      fill: $f-dark;
    }
  }

  &--secondary.btn--transparent,
  &--secondary.btn--outlined {
    color: $f-secondary;

    rect,
    path {
      fill: $f-secondary;
    }
  }

  &--danger {
    background: $bg-error;
    border-color: $b-error;
    color: $f-light;

    rect,
    path {
      fill: $f-light;
    }
  }

  &--danger.btn--transparent,
  &--danger.btn--outlined {
    color: $f-error;

    rect,
    path {
      fill: $f-error;
    }
  }

  &--success {
    background: $bg-success;
    border-color: $b-success;
    color: $f-light;

    rect,
    path {
      fill: $f-light;
    }
  }

  &--success.btn--transparent,
  &--success.btn--outlined {
    color: $f-success;

    rect,
    path {
      fill: $f-success;
    }
  }

  &--transparent {
    border-color: transparent;
    background: transparent;
  }

  &--outlined {
    background: transparent;
  }

  &:disabled {
    background: $bg-disabled;
    border-color: $bg-disabled;
    cursor: not-allowed;
  }
}
</style>
