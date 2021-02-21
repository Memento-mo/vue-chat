export function startLoading(store: any) {
  store.dispatch('loader/fetchStartLoading')
}

export function finishLoading(store: any) {
  store.dispatch('loader/fetchFinishLoading')
}