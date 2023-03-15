<template>
  <Input v-model="login" v-bind="$attrs" @onBlur="$emit('onBlur')" />
</template>

<script lang="ts">
import Vue from 'vue'

import Input from 'components/ui/Input.vue'

export default Vue.extend({
  name: 'Editable',
  components: { Input },
})
</script>

<style lang="scss" scoped></style>
