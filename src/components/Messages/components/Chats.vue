<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <router-link
    :to="{ name: 'messages', query: { id: item.id } }"
    :key="item.id"
    v-for="item in getChats"
    v-else
  >
    <div :class="$style.chat">
      <div
        :class="$style.chat__avatar"
        :style="{ backgroundImage: `url(${item.avatar})` }"
      ></div>
      <div :class="$style.chat__info">
        <div :class="$style['chat__info-name']">{{ item.first_name + ' ' + item.last_name }}</div>
        <div :class="$style['chat__info-message']">{{ item.last_message.text }}</div>
      </div>
      <div :class="$style.chat__time">
        {{ getTime(item.last_message.time) }}
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { computed, onMounted, ref, Ref, defineComponent } from 'vue'
import { Dispatch, useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    
    const isLoading: Ref<boolean> = ref(false)

    function getTime(time: number) {
      const date: Date = new Date(time)

      return `${date.getHours().toString().length !== 1 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes().toString().length !== 1 ? date.getMinutes() : '0' + date.getMinutes()}`
    }

    function fetchChats(): Promise<Dispatch> {
      return store.dispatch('messages/fetchChats')
    }

    async function init (): Promise<void> {
      isLoading.value = true

      await fetchChats()

      isLoading.value = false
    }

    onMounted(() => {
      init()
    })

    return {
      getChats: computed(() => store.getters['messages/getChats']),
      getTime,
      isLoading
    }
  }
})
</script>

<style lang="stylus" module>
.chat {
  padding 1rem
  display flex
  justify-content space-around
  cursor pointer
  color var(--color-light)

  &:hover {
    background: rgba(0, 0, 0, 0.5)
  }

  &__time {
    font-weight 700
  }

  &__info {
    display flex
    flex-direction column
    justify-content space-around
    font-size 12px

    &-name {
      font-weight 700
    }
  }

  &__avatar {
    height 5rem
    width 5rem
    background-size cover
    border-radius 50%
  }
}
</style>