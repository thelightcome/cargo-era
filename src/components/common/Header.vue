<template>
  <header class="header">
    <div class="container header__container">
      <Logo />
      <div class="header__control">
        <Menu v-if="menu.length" :menu="getMenu" class="header__menu" />
        <SwitchLang class="header__switch-lang" />
        <Button
          v-if="isLogged"
          version="primary"
          variant="transparent"
          class="header__quit quit-btn"
          @click="logout"
        >
          <IconLogout class="quit-btn__icon" />
        </Button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

import IconLogout from 'icons/logout.svg?inline'

import SwitchLang from 'components/ui/SwitchLang.vue'
import Logo from 'components/ui/Logo.vue'
import Menu, { IMenuItem } from 'components/ui/Menu.vue'
import Button from 'components/ui/Button.vue'

import { IMenu } from './common.types'

export default Vue.extend({
  name: 'Header',
  components: { IconLogout, SwitchLang, Logo, Menu, Button },
  props: {
    menu: {
      type: Array as PropType<IMenu[]>,
      default() {
        return [] as IMenu[]
      },
    },
  },
  computed: {
    getMenu(): IMenuItem[] {
      return this.menu.map((e) => ({ content: e.name, path: e.path }))
    },
    isLogged(): boolean {
      return this.$auth.loggedIn
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: $header-height;
  background: $grad-1;
  box-shadow: 0 0 15px 0 $bg-dark;
  z-index: $z-10;

  &__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;

    @include tablet {
      justify-content: space-between;
      gap: 3rem;
    }
  }

  &__control {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;

    @include tablet {
      height: 100%;
      flex-grow: 1;
      max-width: 40%;
    }
  }

  &__menu {
    display: none;

    @include tablet {
      height: 100%;
      display: block;
    }
  }

  &__switch-lang {
    left: 0.4rem;
  }

  &__quit {
    right: 0.5rem;
  }

  &__switch-lang,
  &__quit {
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
    align-self: center;

    @include tablet {
      position: relative !important;
      top: unset;
      transform: unset;
      left: unset;
      right: unset;
    }
  }
}

.quit-btn {
  padding: 0.2rem;

  &__icon {
    width: 1.3rem;
    height: 1.3rem;
  }
}
</style>
