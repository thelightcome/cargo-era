<template>
  <Input
    id="search"
    v-model="search"
    label="Search"
    icon="search"
    type="search"
    :disabled="false"
    class="page-list__field"
  />
</template>

<script lang="ts">
import Vue from 'vue'

import Input from 'components/ui/Input.vue'

export default Vue.extend({
  name: 'Search',
  components: { Input },
  props: {
    time: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      search: '' as string,
      id: null as null | ReturnType<typeof setTimeout>,
    }
  },
  watch: {
    search() {
      if (this.id !== null) clearTimeout(this.id)

      this.id = setTimeout(this.calcSearch, this.time)
    },
  },
  methods: {
    calcSearch() {
      this.$emit('search', this.search)
    },
  },
})
</script>

<style lang="scss" scoped></style>
