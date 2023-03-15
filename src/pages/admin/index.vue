<template>
  <div class="page add">
    <div class="container flex-col">
      <ScanForm v-model="barcode" title="Product Scan" class="add__barcode" />
      <AddProduct
        v-if="true"
        :is-user="false"
        :barcode="barcode"
        class="add__product"
        @onSubmit="onSubmit"
      />
      <ScanForm
        v-if="true"
        v-model="qrcode"
        title="Card Scan"
        type="qrcode"
        class="add__qrcode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ICreateProduct } from 'types/product.types'

import ScanForm from 'components/admin/ScanForm.vue'
import AddProduct from 'components/product/AddProduct.vue'

export default Vue.extend({
  name: 'PageAdminIndex',
  components: { ScanForm, AddProduct },
  layout: 'admin',
  data() {
    return {
      barcode: '',
      exist: true,
      description: '',
      qrcode: '',
    }
  },
  watch: {
    barcode(oldValue, newValue) {
      if (oldValue === newValue) return
      this.trackProduct()
    },
    qrcode(oldValue, newValue) {
      if (oldValue === newValue) return
      this.addProductToCard()
    },
  },
  methods: {
    async trackProduct() {
      const res = await this.$repositories.product.trackProduct(this.barcode)
      if (!res) this.exist = false
    },
    async onSubmit(createProduct: ICreateProduct) {
      const res = await this.$repositories.product.addProduct(createProduct)
      if (res) this.exist = true
    },
    async addProductToCard() {
      const res = await this.$repositories.product.addProductToCard({
        trackCode: this.barcode,
        cardCode: this.qrcode,
      })

      console.log(res)
    },
  },
})
</script>

<style lang="scss" scoped>
.add {
  &__barcode {
    max-width: 450px;
    margin-bottom: 1rem;
  }

  &__product {
    max-width: 400px;
    margin-bottom: 1rem;
  }

  &__qrcode {
    max-width: 450px;
  }
}
</style>
