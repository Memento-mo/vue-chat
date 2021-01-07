import { createStore } from 'vuex'

import auth from './store/auth.js'
import messages from './store/messages.js'
import profile from './store/profile.js'

export default createStore({
  modules: {
    auth,
    messages,
    profile
  }
})