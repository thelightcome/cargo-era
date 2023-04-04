<template>
  <div class="page add">
    <div class="container flex-col">
      <ScanForm v-model="barcode" title="Product Scan" class="add__barcode" />
      <div v-show="barcode" class="add__btns">
        <Button @click="trackProduct">Send To Check</Button>
      </div>
      <AddProduct
        v-if="exist === false"
        :is-user="false"
        :barcode="barcode"
        class="add__product"
        @onSubmit="onSubmit"
      />
      <ScanForm
        v-if="exist === true"
        v-model="qrcode"
        title="Card Scan"
        type="qrcode"
        class="add__qrcode"
      />
      <div v-show="qrcode" class="add__btns">
        <Button @click="addProductToCard">Send To Bag</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ICreateProduct } from 'types/product.types'

import Button from 'components/ui/Button.vue'
import ScanForm from 'components/admin/ScanForm.vue'
import AddProduct from 'components/product/AddProduct.vue'

export default Vue.extend({
  name: 'PageAdminIndex',
  components: { ScanForm, AddProduct, Button },
  layout: 'admin',
  data() {
    return {
      barcode: '',
      exist: null as null | boolean,
      description: '',
      qrcode: '',
    }
  },
  methods: {
    async trackProduct() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$repositories.product.trackProduct(this.barcode)
        if (!res) this.exist = false
      } catch (err: any) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          message: this.$tc(err.error),
        })
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async onSubmit(createProduct: ICreateProduct) {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$repositories.product.addProduct({
          ...createProduct,
          trackCode: this.barcode,
        })
        if (res) this.exist = true
      } catch (err: any) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          message: this.$tc(err.error),
        })
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
    async addProductToCard() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$repositories.product.addProductToCard({
          trackCode: this.barcode,
          cardCode: this.qrcode,
        })

        console.log(res)
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
    margin-bottom: 1rem;
  }

  &__btns {
    margin-bottom: 1rem;
  }
}
</style>
