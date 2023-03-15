<template>
  <footer class="footer">
    <div class="container footer__container">
      <Menu
        v-if="menu.length"
        :menu="getMenu"
        :icon="true"
        class="footer__menu"
      />
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

import Menu, { IMenuItem } from 'components/ui/Menu.vue'

import { IMenu } from './common.types'

export default Vue.extend({
  name: 'Footer',
  components: { Menu },
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
      return this.menu.map((e) => ({ content: e.icon, path: e.path }))
    },
  },
})
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: $footer-height;
  background: $grad-1;
  box-shadow: 0 0 15px 0 $bg-dark;
  z-index: $z-10;

  @include tablet {
    position: static;
    background: transparent;
    box-shadow: unset;
  }

  &__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 0;

    @include tablet {
      justify-content: space-between;
      gap: 3rem;
      padding: 0 10px;
    }
  }

  &__menu {
    height: 100%;
    display: block;

    @include tablet {
      display: none;
    }
  }
}
</style>
