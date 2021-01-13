import { createWebHistory, createRouter, Router } from 'vue-router'

import routes from './router/router'

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [routes]
})

export default router