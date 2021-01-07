import avatar from '../img/my.js'

export default {
  namespaced: true,
  state: {
    account: {
      first_name: 'Глеб',
      last_name: 'Пологов',
      avatar
    }
  },
  mutations: {},
  getters: {
    getAccount: ({ account }) => account
  },
  actions: {}
}