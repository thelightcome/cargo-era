import { ActionTree, MutationTree, GetterTree } from 'vuex'

import { IToast } from 'types/toast.types'

export const state = () => ({
  active: false,
  toast: [] as IToast[],
})

export type stateT = ReturnType<typeof state>

export const namespaced = true

export const mutations: MutationTree<stateT> = {
  SET_ACTIVE(state, payload) {
    state.active = payload
  },
  SET_TOAST(state, payload) {
    if (!state.active) state.active = true
    state.toast = [payload, ...state.toast]
  },
  REMOVE_TOAST(state, payload) {
    const index = state.toast.findIndex((e) => e.id === payload)
    if (index !== undefined) {
      state.toast.splice(index, 1)
    }
  },
}

export const actions: ActionTree<stateT, stateT> = {
  setToast({ commit, state }, payload) {
    const last = state.toast[state.toast.length - 1]
    const id = (last?.id || 0) + 1
    commit('SET_TOAST', {
      id,
      ...payload,
    })
    setTimeout(() => {
      commit('REMOVE_TOAST', id)
    }, 5000)
  },
}

export const getters: GetterTree<stateT, stateT> = {
  isActive: (state) => state.active,
  getToast: (state) => state.toast,
}
