<template>
  <main class="layout error">
    <div class="container error__container">
      <div class="error__inner">
        <span class="error__code">{{ error.statusCode }}</span>
        <p v-if="error.statusCode === 404" class="error__text">
          {{ $tc('pageErrorMsg') }}
        </p>
        <h1 v-else-if="error.message" class="error__title">
          {{ error.message }}
        </h1>
        <Button
          class="error__button"
          version="primary"
          variant="outlined"
          @click="$router.go(-1)"
        >
          {{ $tc('toMain') }}
        </Button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import Button from 'components/ui/Button.vue'

export default Vue.extend({
  name: 'Error',
  components: { Button },
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  head() {
    return {
      title: this.$tc('unsuccessfully'),
    }
  },
})
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;

  &__container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }

  &__inner {
    width: 100%;
    max-width: 600px;
    padding-bottom: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &__code {
    font-size: $f-12xl;
    color: $f-primary;
    margin-bottom: 3rem;
  }

  &__text,
  &__title {
    text-transform: uppercase;
    margin: 0;
    margin-bottom: 4rem;
  }

  &__button {
    margin: 20px 0;
  }
}
</style>
