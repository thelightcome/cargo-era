<template>
  <main class="layout user">
    <Header :menu="menu" />
    <Nuxt />
    <Footer :menu="menu" />
    <Toast />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import IconAdd from 'icons/add.svg?inline'
import IconSetting from 'icons/setting.svg?inline'
import IconToDoList from 'icons/to-do-list.svg?inline'

import Toast from 'components/common/Toast.vue'
import Header from 'components/common/Header.vue'
import Footer from 'components/common/Footer.vue'

export default Vue.extend({
  name: 'LayoutUser',
  components: { Header, Footer, Toast },
  middleware: ['user'],
  data() {
    return {
      menu: [
        {
          path: '/user/list',
          name: 'list',
          icon: IconToDoList,
        },
        {
          path: '/user',
          name: 'main',
          icon: IconAdd,
        },
        {
          path: '/user/setting',
          name: 'setting',
          icon: IconSetting,
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped></style>
