import { Auth as NuxtAuth } from '@nuxtjs/auth-next'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  activated: boolean
  createdBy: string
  createdDate: string
  lastModifiedBy: string
  lastModifiedDate: string
  authorities: string[]
  branchCode: string
}

declare module 'vue/types/vue' {
  interface Auth extends NuxtAuth {
    user: User & typeof NuxtAuth.prototype.user
  }
}

declare module '@nuxt/types' {
  interface Auth extends NuxtAuth {
    user: User & typeof NuxtAuth.prototype.user
  }
}

declare module 'vuex/types/index' {
  interface Auth extends NuxtAuth {
    user: User & typeof NuxtAuth.prototype.user
  }
}
