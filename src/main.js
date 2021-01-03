import { createApp } from 'vue'

import store from './store'
import router from './router'

import App from './App.vue'

import ToastService from 'primevue/toastservice.js'

import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.use(ToastService)

app.mount('#app')
