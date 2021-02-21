<template>
  <div :class="$style['message-container']">
    <header :class="$style.header">
      <Navigation />
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

<script lang="ts">
import Chats from './Chats.vue'
import Chat from './Chat.vue'
import Navigation from '../../Main/components/Navigation.vue'

import { useRouter } from 'vue-router'
import { Dispatch, useStore } from 'vuex'
import { onMounted, defineComponent } from 'vue'

type Actions = 'signout' | 'registration'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    function handleTo(type: Actions) {
      switch(type) {
        case 'signout':
          store.dispatch('auth/logout')
          store.dispatch('messages/clearChats')

          return router.replace({ name: 'login' })
        case 'registration':
          return router.replace({ name: 'registration' })
      }
    }

    function fetchAccount(): Promise<Dispatch> {
      return store.dispatch('profile/fetchAccount')
    }

    async function init(): Promise<void> {
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
    Chat,
    Navigation
  }
})
</script>

<style lang="stylus" module>
.message-container {
  position relative
  top 7%
  display flex
  height 85%
  margin 0px auto
  background-color var(--color-primary)
  border-radius 3rem

  width 125rem
  color var(--color-light)

  &::before {
    position absolute
    content ''
    height: 100%;
    width: 105rem;
    z-index: -1;
    left: 9%;

    -webkit-box-shadow 0px 0px 35px 2px #1a171a
    -moz-box-shadow 0px 0px 35px 2px #1a171a
    box-shadow 0px 13px 51px 2px #1a171a
  }
}

.header {
  width 8rem
  background-color var(--color-primary-light)
  border-top-left-radius 3rem
  border-bottom-left-radius 3rem
}

.messages {
  display flex
  width 100%

  &__chats {
    min-width 420px
    height 100%
    // overflow-y scroll

    // &::-webkit-scrollbar { width: 2px; height: 3px;}
    // &::-webkit-scrollbar-track { background-color: #fff;}
    // &::-webkit-scrollbar-track-piece { background-color: var(--color-secondary-light);}
    // &::-webkit-scrollbar-thumb { height: 50px; background-color: var(--color-light-2); border-radius: 3px;}
    // &::-webkit-scrollbar-corner { background-color: #fff;}
    // &::-webkit-resizer { background-color: #fff;}
  }

  &__chat {
    width 100%
    height 100%
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
