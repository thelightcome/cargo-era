import { servicesType } from 'services/index'

declare module 'vue/types/vue' {
  interface Vue {
    $services: servicesType
  }
}

declare module '@nuxt/types' {
  interface Context {
    $services: servicesType
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $services: servicesType
  }
}
