<template>
  <div :class="$style.container">
    <header
      class="row justify-content-between"
    >
      <HeaderChats />
    </header>

    <div
      class="m-top-32"
      :class="$style['chats__search-box']"
    >
      <Search />
    </div>
  
    <router-link
      :key="item.id"
      :to="{ name: 'messages', query: { id: item.id } }"
      v-for="item in getChats"
    >
      <ChatItem :item="item" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, defineComponent } from 'vue'
import { Dispatch, useStore } from 'vuex'

import { finishLoading, startLoading } from '@/utils/helpers'

import ChatItem from './Chats/ChatItem.vue'
import HeaderChats from './Chats/Header.vue'
import Search from './Chats/Search.vue'

export default defineComponent({
  components: {
    ChatItem,
    HeaderChats,
    Search
  },
  setup () {
    const store = useStore()

    function fetchChats(): Promise<Dispatch> {
      return store.dispatch('messages/fetchChats')
    }

    async function init (): Promise<void> {
      startLoading(store)
      
      await fetchChats()

      finishLoading(store)
    }

    onMounted(() => {
      init()
    })

    return {
      getChats: computed(() => store.getters['messages/getChats']),
      isLoading: computed(() => store.getters['loader/loader'])
    }
  }
})
</script>

<style lang="stylus" module>
.container {
  padding 3rem
}
</style>