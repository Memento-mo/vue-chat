import SignUp from '@components-base/Auth/components/SignUp.vue'
import SignIn from '@components-base/Auth/components/SignIn.vue'

import Home from './Home.vue'

const router = {
  path: '/',
  component: Home,
  children: [
    {
      path: 'registration',
      name: 'registration',
      component: SignUp
    },
    {
      path: 'login',
      name: 'login',
      component: SignIn
    }
  ]
}


export default router