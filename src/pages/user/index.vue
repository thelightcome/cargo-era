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

import AddProduct from 'components/product/AddProduct.vue'

export default Vue.extend({
  name: 'PageUserIndex',
  components: { AddProduct },
  layout: 'user',
  methods: {
    async onSubmit(createProduct: ICreateProduct) {
      try {
        this.$nuxt.$loading.start()
        await this.$repositories.product.addProduct(createProduct)
        this.$store.dispatch('toast/setToast', {
          type: 'valid',
          message: 'Product added',
        })
      } catch (err: any) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          message: this.$tc(err.error),
        })
      } finally {
        this.$nuxt.$loading.finish()
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
