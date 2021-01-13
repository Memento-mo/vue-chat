import SignUp from '@components-base/Auth/components/SignUp.vue'
import SignIn from '@components-base/Auth/components/SignIn.vue'

import Home from '@components-base/Main/components/Home.vue'
import Messages from '@components-base/Messages/components/Messages.vue'

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
    },
    {
      path: 'messages',
      name: 'messages',
      component: Messages
    }
  ]
}


export default router