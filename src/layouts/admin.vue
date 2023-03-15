<template>
  <div class="layout">
    <Header :menu="menu" />
    <Nuxt />
    <Footer :menu="menu" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import IconAdd from 'icons/add.svg?inline'
import IconSetting from 'icons/setting.svg?inline'
import IconToDoList from 'icons/to-do-list.svg?inline'

import Header from 'components/common/Header.vue'
import Footer from 'components/common/Footer.vue'

export default Vue.extend({
  name: 'LayoutAdmin',
  components: { Header, Footer },
  // middleware: ['admin'],
  data() {
    return {
      menu: [
        {
          path: '/admin/list',
          name: 'list',
          icon: IconToDoList,
        },
        {
          path: '/admin',
          name: 'main',
          icon: IconAdd,
        },
        {
          path: '/admin/setting',
          name: 'setting',
          icon: IconSetting,
        },
      ],
    }
  },
  mounted() {
    console.log('$auth.user', this.$auth.user)
  },
})
</script>

<style lang="scss" scoped></style>
