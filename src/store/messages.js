import { useAxios } from '@api/api.js'

const $http = useAxios()

export default {
  namespaced: true,
  state: {
    chats: []
  },
  getters: {
    getChats: ({ chats }) => chats,
    getChatById: ({ chats }) => id => chats.find(chat => chat.id === id)
  },
  mutations: {
    SET_CHATS: (state, chats) => (state.chats = chats),
    CLEAR_CHATS: (state) => (state.chats = [])
  },
  actions: {
    fetchChats ({ commit }) {
      return new Promise(async (resolve) => {
        const { data } = await $http.get('/messages')

        commit('SET_CHATS', data.chats)

        resolve()
      })
    },
    clearChats ({ commit }) {
      commit('CLEAR_CHATS')
    }
  }
}