import { useAxios } from '@api/api.js'

const $http = useAxios()

export default {
  namespaced: true,
  state: {
    token: null
  },
  getters: {
    getToken: (state) => {
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
    LOGIN_SUCCESS: (state, token) => {
      state.token = token
    }
  },
  actions: {
    setToken: ({ commit }, { token, refreshToken }) => {
      if (token) {
        const access_token = token
        const refresh_token = refreshToken

        localStorage.setItem('token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        
        commit('LOGIN_SUCCESS', access_token)
      }
    },
    verifyToken: async ({ dispatch }) => {
      const refresh_token = localStorage.getItem('refresh_token')

      return $http.post('/token', { refresh_token })
        .then(({ data }) => {

          dispatch('setToken', { token: data.token, refreshToken: data.refreshToken })
        })
    }
  }
}