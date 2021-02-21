import { Component, createApp } from 'vue'

import store from './store'
import router from './router'

import App from './App.vue'

import ToastService from 'primevue/toastservice'

import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import './styles/main.css'

import * as icons from './icons'

const app = createApp(App)

app.use(store)
app.use(router)

app.use(ToastService)

function useSVGIcons () {
  Object.keys(icons.default).forEach((component) => {
    // @ts-ignore
    app.component(icons.default[component].name!, icons.default[component])
  })
}

useSVGIcons()

app.mount('#app')

