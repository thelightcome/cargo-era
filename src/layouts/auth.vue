<template>
  <main class="layout auth-layout">
    <Header />
    <Nuxt />
    <Footer class="auth-layout__footer" />
    <Toast />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import Toast from 'components/common/Toast.vue'
import Header from 'components/common/Header.vue'
import Footer from 'components/common/Footer.vue'

export default Vue.extend({
  name: 'LayoutAuth',
  components: { Header, Footer, Toast },
  middleware: ['authcust'],
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
