import { VuexControl } from '@/types/store/types'


interface State {
  loading: boolean
}

export default {
  namespaced: true,
  state: {
    loading: false
  },
  getters: {
    loader: (state: State) => state.loading
  },
  mutations: {
    START_LOADING: (state: State) => {
      state.loading = true
    },
    FINISH_LOADING: (state: State) => {
      state.loading = false
    }
  },
  actions: {
    fetchStartLoading: ({ commit }: VuexControl<State>) => {
      commit('START_LOADING')
    },
    fetchFinishLoading: ({ commit }: VuexControl<State>) => {
      commit('FINISH_LOADING')
    }
  }
}