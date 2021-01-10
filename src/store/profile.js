import { useAxios } from '@api/api.js'

const $http = useAxios()

export default {
  namespaced: true,
  state: {
    account: {}
  },
  mutations: {
    SET_PROFILE: (state, profile) => (state.account = profile)
  },
  getters: {
    getAccount: ({ account }) => account
  },
  actions: {
    fetchAccount: ({ commit }) => {
      return new Promise(async (resolve) => {
        const { data } = await $http.get('/profile')

        commit('SET_PROFILE', data)

        resolve()
      })
    }
  }
}