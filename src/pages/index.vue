<template>
  <main></main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  middleware({ redirect }) {
    return redirect(302, '/auth')
  },
})
</script>
