import { useAxios } from '@api/api'

import { VuexControl } from '@/types/store/types'
import { State, Account, AccountResponse } from '@/types/store/profile'

const $http = useAxios()

export default {
  namespaced: true,
  state: {
    account: {}
  },
  mutations: {
    SET_PROFILE: (state: State, profile: Account) => (state.account = profile)
  },
  getters: {
    getAccount: ({ account }: State) => account
  },
  actions: {
    fetchAccount: ({ commit }: VuexControl<State>) => {
      return new Promise<void>(async (resolve) => {
        const { data }: AccountResponse = await $http.get('/profile')

        commit('SET_PROFILE', data)

        resolve()
      })
    }
  }
}