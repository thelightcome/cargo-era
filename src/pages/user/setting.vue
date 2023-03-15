<template>
  <div class="page setting-page">
    <div class="container">
      <UserData v-if="getUser" :user-data="getUser" />
      <UserPassword />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IUserData } from 'types/auth.types'

import UserData from 'components/user/UserData.vue'
import UserPassword from 'components/user/UserPassword.vue'

export default Vue.extend({
  name: 'PageUserSetting',
  components: { UserData, UserPassword },
  layout: 'user',
  computed: {
    getUser(): IUserData | undefined {
      return this.$auth?.user
    },
  },
})
</script>

<style lang="scss" scoped></style>
