import { useAxios } from '@api/api'

import { VuexControl } from '@/types/store/types'
import { State, Chat, ChatsResponse } from '@/types/store/messages'

const $http = useAxios()

export default {
  namespaced: true,
  state: {
    chats: []
  },
  getters: {
    getChats: ({ chats }: State): Chat[] => chats,
    getChatById: ({ chats }: State) => (id: string): Chat | undefined => chats.find(chat => chat.id === id)
  },
  mutations: {
    SET_CHATS: (state: State, chats: Chat[]): void => {
      state.chats = chats
    },
    CLEAR_CHATS: (state: State): void => {
      state.chats = []
    }
  },
  actions: {
    fetchChats ({ commit }: VuexControl<State>) {
      return new Promise<void>(async (resolve) => {
        const { data }: ChatsResponse = await $http.get('/messages')

        commit('SET_CHATS', data.chats)
        
        resolve()
      })
    },
    clearChats ({ commit }: VuexControl<State>) {
      commit('CLEAR_CHATS')
    }
  }
}