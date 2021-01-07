import { useAxios } from '@api/api.js'

import avatar from '../img/img'

const $http = useAxios()

export default {
  namespaced: true,
  state: {
    chats: [
      { id: 1, first_name: 'Алеша', last_name: 'Чернышка', last_message: { text: 'Салют', time: 1609938588801 }, avatar, messages: {
        interlocutor: [
          { message: 'Привет', time: 1609938557252, my: false, id: 2342342423 },
          { message: 'как у тебя дела друган', time: 1609938557252, my: false, id: 23423424233 },
          { message: 'как у  тебя делишки', time: 1609938557252, my: false, id: 23423424255 },
          { message: 'как утебя дела друган', time: 1609938557252, my: false, id: 234234242332 },
          { message: 'Привет', time: 1609938557252, my: false, id: 234234242312 },
          { message: 'Привет', time: 1609938557252, my: false, id: 23423424235 },
          { message: 'Привет', time: 1609938557252, my: false, id: 2342342423232 },
        ],
        my: [
          { message: 'Да все круто', time: 1609938588801, my: true, id: 243423411343353 },
          { message: 'Как сам', time: 1609938588801, my: true, id: 234623411343353 },
          { message: 'Рабтаю', time: 1609938588801, my: true, id: 234243411343353 },
          { message: 'Салют', time: 1609938588801, my: true, id: 234223411343353 },
          { message: 'Салют', time: 1609938588801, my: true, id: 234223411343353 },
          { message: 'Салют', time: 1609938588801, my: true, id: 234223411343353 },
        ]
      }}
    ]
  },
  getters: {
    getChats: ({ chats }) => chats,
    getChatById: ({ chats }) => id => chats.find(chat => chat.id === +id)
  },
  mutations: {},
  actions: {}
}