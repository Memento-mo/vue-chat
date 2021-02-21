import { createStore } from 'vuex'

import auth from './store/auth'
import messages from './store/messages'
import profile from './store/profile'
import loader from './store/loader'

export default createStore({
  modules: {
    auth,
    messages,
    profile,
    loader
  }
})