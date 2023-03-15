<template>
  <main class="layout auth-layout">
    <Header />
    <Nuxt />
    <Footer class="auth-layout__footer" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import Header from 'components/common/Header.vue'
import Footer from 'components/common/Footer.vue'

export default Vue.extend({
  name: 'LayoutAuth',
  components: { Header, Footer },
  // middleware: ['auth'],
})
</script>

<style lang="scss" scoped>
.auth-layout {
  &__footer {
    display: none;

    @include tablet {
      display: block;
    }
  }
}
</style>
