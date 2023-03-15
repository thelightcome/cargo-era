<template>
  <nav class="nav">
    <ul class="nav__list">
      <li v-for="(item, itemInd) in menu" :key="itemInd" class="nav__item">
        <NuxtLink :to="item.path" class="nav__link">
          <span v-if="!icon">{{ item.content }}</span>
          <template v-else>
            <component :is="item.content" class="nav__icon"></component>
          </template>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export interface IMenuItem {
  content: string | SVGElement
  path: string
}

export default Vue.extend({
  name: 'Menu',
  props: {
    menu: {
      type: Array as PropType<IMenuItem[]>,
      required: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;

  &__list {
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  &__item {
    flex-grow: 1;

    &:not(:last-child) {
      border-right: 1px solid #02020222;

      @include tablet {
        border-right: none;
      }
    }
  }

  &__link {
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $f-light;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all 0.2s linear;
    }

    &:hover {
      &::before {
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.1);
      }
    }
  }

  &__icon {
    width: 1.8rem;
    height: 1.8rem;

    path {
      fill: $bg-light;
    }
  }
}
</style>
