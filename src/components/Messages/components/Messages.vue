<template>
  <div :class="$style['message-container']">
    <header :class="$style.header">
      <div :class="$style.header__controls">
        <button
          :class="$style['header__controls-button']"
          @click="handleTo('signout')"
        >
          SignOut
        </button>
        <button
          :class="$style['header__controls-button']"
          @click="handleTo('registration')"
        >
          SignUp
        </button>
      </div>
    </header>
    <main :class="$style.messages">
      <aside :class="$style.messages__chats">
        <Chats />
      </aside>
      <section :class="$style.messages__chat">
        <Chat />
      </section>
    </main>
  </div>
</template>

<script>
import Chats from './Chats.vue'
import Chat from './Chat.vue'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    function handleTo(type) {
      switch(type) {
        case 'signout':
          store.dispatch('auth/logout')
          store.dispatch('messages/clearChats')

          return router.replace({ name: 'login' })
        case 'registration':
          return router.replace({ name: 'registration' })
      }
    }

    function fetchAccount() {
      return store.dispatch('profile/fetchAccount')
    }

    async function init() {
      await fetchAccount()
    }

    onMounted(() => {
      init()
    })

    return {
      handleTo
    }
  },
  components: {
    Chats,
    Chat
  }
}
</script>

<style lang="stylus" module>
.message-container {
  margin 10px auto
  background-color var(--color-primary)

  max-width 110rem
  height 93vh
  color var(--color-light)

  -webkit-box-shadow: 0px 0px 35px 2px rgba(26,23,26,1);
  -moz-box-shadow: 0px 0px 35px 2px rgba(26,23,26,1);
  box-shadow: 0px 0px 35px 2px rgba(26,23,26,1);
}

.header {
  height 8rem
  padding 1rem
}

.messages {
  display flex
  height 85vh

  &__chats {
    flex-basis 23%
    height 100%
    background var(--color-secondary)
    overflow-y scroll

    &::-webkit-scrollbar { width: 2px; height: 3px;}
    &::-webkit-scrollbar-track { background-color: #fff;}
    &::-webkit-scrollbar-track-piece { background-color: var(--color-secondary-light);}
    &::-webkit-scrollbar-thumb { height: 50px; background-color: var(--color-light-2); border-radius: 3px;}
    &::-webkit-scrollbar-corner { background-color: #fff;}
    &::-webkit-resizer { background-color: #fff;}
  }

  &__chat {
    flex-basis 85rem
    flex-shrink 2
    height 100%
    background var(--color-secondary)
    padding 1rem
  }
}

.header__controls {
  display flex
  justify-content flex-end

  &-button {
    background none
    border none
    outline none
    cursor pointer
    color var(--color-secondary)
    margin-right 1rem
  }
}
</style>
