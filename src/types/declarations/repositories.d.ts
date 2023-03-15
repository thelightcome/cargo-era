import { repositoriesType } from 'repositories/index'

declare module 'vue/types/vue' {
  interface Vue {
    $repositories: repositoriesType
  }
}

declare module '@nuxt/types' {
  interface Context {
    $repositories: repositoriesType
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $repositories: repositoriesType
  }
}
