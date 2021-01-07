import { createWebHistory, createRouter } from 'vue-router'

import routes from './router/router'

const router = createRouter({
  history: createWebHistory(),
  routes: [routes]
})

export default router