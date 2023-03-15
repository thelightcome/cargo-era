<template>
  <div class="pagination">
    <Button
      v-for="ind in count"
      :key="ind"
      type="text"
      :version="'primary'"
      :variant="current === ind ? 'filled' : 'outlined'"
      class="pagination__btn"
      :class="{
        'pagination__btn--active': current + 1 === ind,
      }"
      @click="change(ind)"
      >{{ ind }}</Button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'Pagination',
  components: { Button },
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 10,
    },
    limit: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    count(): number[] {
      return this.calculatePages(this.current, this.total, this.limit)
    },
  },
  methods: {
    calculatePages(
      current: number = 1,
      total: number = 1,
      limit: number = 4,
      expand: number = 1
    ): number[] {
      if (total === 1) return []
      if (current > total) current = total
      limit = limit < total ? limit : total
      expand = limit - 2 * expand < 3 ? 0 : expand
      let arr = this.getArrayNumber(1, expand)
      const endPagin = this.getArrayNumber(total - expand + 1, expand)
      limit = limit - arr.length - endPagin.length
      let start = current - 1 > (arr.length || 1) ? current - 1 : arr.length + 1
      const end = endPagin[0] - 1 || total
      if (start + (limit - 1) >= end) {
        start = end - limit + 1
      }
      arr = arr.concat(this.getArrayNumber(start, limit))
      arr = arr.concat(endPagin)
      return arr
    },
    getArrayNumber(start: number, count: number): number[] {
      const arr = []
      for (let i = start; i < start + count; i++) {
        arr.push(i)
      }
      return arr
    },
    change(n: number) {
      this.$emit('change', n)
    },
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  display: inline-flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.8rem;

  &__btn {
    padding: 0;
    width: 1.6rem;
    height: 1.6rem;
  }
}
</style>
