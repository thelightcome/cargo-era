import { ActionTree, MutationTree, GetterTree } from 'vuex'

export const state = () => ({
  user: {},
})

export type stateT = ReturnType<typeof state>

export const namespaced = true

export const mutations: MutationTree<stateT> = {
  SET_USER(state, payload) {
    state.user = payload
  },
}

export const actions: ActionTree<stateT, stateT> = {
  async fetchUser({ commit }) {},
}

export const getters: GetterTree<stateT, stateT> = {
  getUser: (state) => state.user,
}
