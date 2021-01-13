import { useAxios } from '@api/api'

import { VuexControl } from '@/types/store/types'
import { Tokens, State } from '@/types/store/auth'

const $http = useAxios()

export default {
  namespaced: true,
  state: {
    token: null
  },
  getters: {
    getToken: (state: State) => {
      if (!state) return null

      let token = state.token

      if (!token) {
        token = localStorage.getItem('token')
      }

      if (!token) return null

      return token
    }
  },
  mutations: {
    LOGIN_SUCCESS: (state: State, token: string) => (state.token = token),
    LOGOUT: (state: State) => (state.token = null)
  },
  actions: {
    setToken: ({ commit }: VuexControl<State>, { token, refreshToken }: Tokens) => {
      if (token) {
        const access_token = token
        const refresh_token = refreshToken

        localStorage.setItem('token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        
        commit('LOGIN_SUCCESS', access_token)
      }
    },
    verifyToken: async () => {
      const refresh_token = localStorage.getItem('refresh_token')

      return $http.post('/token', { refresh_token })
    },
    logout: ({ commit }: VuexControl<State>) => {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')

      commit('LOGOUT')
    }
  }
}