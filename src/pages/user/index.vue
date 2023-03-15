<template>
  <div class="page add">
    <div class="container flex-col">
      <AddProduct ref="form" class="add__product" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ICreateProduct } from 'types/product.types'

import AddProduct, { ICAddProduct } from 'components/product/AddProduct.vue'

export default Vue.extend({
  name: 'PageUserIndex',
  components: { AddProduct },
  layout: 'user',
  methods: {
    async onSubmit(createProduct: ICreateProduct) {
      const res = await this.$repositories.product.addProduct(createProduct)
      if (res) {
        ;(this.$refs.form as ICAddProduct)?.clear()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.add {
  &__product {
    max-width: 450px;
    margin-bottom: 2rem;
  }
}
</style>
