<template>
  <div class="switch-lang">
    <Button
      version="primary"
      variant="outlined"
      class="switch-lang__btn"
      @click="active = !active"
    >
      <IconWorld class="switch-lang__icon" />
      <span>{{ getLang }}</span>
    </Button>
    <transition name="slide-top">
      <div v-if="active" class="switch-lang__option">
        <div
          v-for="lang in getLangs"
          :key="lang?.code"
          class="switch-lang__items"
          @click="selectLang(lang)"
        >
          {{ lang.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LocaleObject } from '@nuxtjs/i18n'

import IconWorld from 'icons/world.svg?inline'

import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'SwitchLang',
  components: { IconWorld, Button },
  data() {
    return {
      active: false,
    }
  },
  computed: {
    getLang(): string {
      return this.$i18n.locale
    },
    getLangs(): LocaleObject[] {
      return this.$i18n.locales as LocaleObject[]
    },
  },
  methods: {
    selectLang(lang: LocaleObject) {
      this.$i18n.setLocale(lang.code)
      this.active = false
    },
  },
})
</script>

<style lang="scss" scoped>
.switch-lang {
  position: relative;

  &__btn {
    padding: 0.2rem;
    background: $bg-light;
    cursor: pointer;
  }

  &__icon {
    width: 1.3rem;
    height: 1.3rem;
    pointer-events: none;
    margin-right: 0.2rem;
  }

  &__option {
    position: absolute;
    top: 100%;
    left: 0;
    right: unset;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background: $bg-main;
    border-radius: 0.5rem;
    overflow-y: auto;
    margin-top: 0.3rem;
    border: 1px solid $b-primary;

    @include tablet {
      left: unset;
      right: 0;
    }
  }

  &__items {
    min-width: 5rem;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
  }
}
</style>
