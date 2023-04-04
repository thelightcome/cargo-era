<template>
  <form class="form" @submit.prevent="">
    <Input
      id="code"
      v-model="code"
      :label="isUser ? 'Track Code' : 'User Code'"
      name="code"
      icon="text"
      type="text"
      :disabled="false"
      :error="codeError"
      class="form__field"
      @onBlur="onBlur('code')"
    />
    <Textarea
      id="description"
      v-model="description"
      label="Description"
      :disabled="false"
      :error="descriptionError"
      class="form__textarea"
      @onBlur="onBlur('description')"
    />
    <div class="form__field form__field--btn">
      <Button class="form__button" @click="onSubmit">Send</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import { ICreateProduct } from 'types/product.types'

import Input from 'components/ui/Input.vue'
import Button from 'components/ui/Button.vue'
import Textarea from 'components/ui/Textarea.vue'

export interface ICAddProduct extends Vue {
  clear(): void
}

export default Vue.extend({
  name: 'AddProduct',
  components: { Input, Button, Textarea },
  props: {
    isUser: {
      type: Boolean,
      default: true,
    },
    barcode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      code: '',
      codeError: '',
      description: '',
      descriptionError: '',
      errors: {
        required: this.$tc('required'),
        max: this.$tc('max'),
      },
    }
  },
  computed: {
    isHasError(): boolean {
      return !!(this.codeError || this.descriptionError)
    },
    getParseData(): ICreateProduct {
      return {
        [this.isUser ? 'trackCode' : 'userCode']: this.code,
        description: this.description,
      }
    },
  },
  watch: {
    barcode: {
      immediate: true,
      handler() {
        if (!this.isUser && this.barcode) this.code = this.barcode
      },
    },
  },
  methods: {
    onBlur(type: string) {
      this.check(type)
    },
    check(type?: string) {
      if (!type || type === 'code')
        this.codeError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.code),
          this.errors
        )
      if (!type || type === 'description')
        this.descriptionError = this.$services.formValidation.getError(
          this.$services.formValidation.text(this.description),
          this.errors
        )
    },
    clear() {
      this.code = ''
      this.description = ''
    },
    onSubmit() {
      this.check()
      if (this.isHasError) return
      this.$emit('onSubmit', this.getParseData)
    },
  },
})
</script>

<style lang="scss" scoped>
.form {
  width: 100%;

  &__field {
    margin-bottom: 1rem;
  }

  &__textarea {
    margin-bottom: 1.8rem;
  }
}
</style>
