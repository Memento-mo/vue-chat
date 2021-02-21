<template>
  <div
    :class="$style['chat-preview']"
    v-if="!chat"
  >
    Please select a chat to start messaging
  </div>
  <div
    :class="$style['chat-box']"
    v-else
  >
    <div :class="$style['chat-messages']">
      <div 
        :key="message.id"
        :class="$style['chat-message']"
        v-for="message in messages"
      >
        <div
          :class="$style['input-box__image']" 
          :style="{ backgroundImage: `url(${message.my ? account.avatar : chat.avatar})` }"
        />

        <div
          :class="$style['chat-message__box']"
        >
          <div :class="$style['chat-message__name']">{{ message.my ? account.first_name : chat.first_name }}</div>
          <div :class="$style['chat-message__text']">{{ message.message }}</div>
        </div>
      </div>
    </div>
    <div :class="$style['input-box']">
      <div
        :class="$style['input-box__image']" 
        :style="{ backgroundImage: `url(${account.avatar})` }"
      />
      <div>
        <form @submit.prevent="handleSend">
          <input
            placeholder="Write a message..."
            type="text"
            :class="$style['input-box__input']"
            v-model="inputMessage"
          >
        </form>
      </div>
      <div
        :class="$style['input-box__image']" 
        :style="{ backgroundImage: `url(${chat.avatar})` }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useAxios } from '@api/api'

import { computed, onMounted, ref, Ref, watch, defineComponent, ComputedRef } from 'vue'
import { Chat, Message } from '@/types/store/messages'

export default defineComponent({
  setup () {
    const route = useRoute()
    const store = useStore()
    const http = useAxios()
    const inputMessage: Ref<string> = ref('')

    const chat: Ref<Chat | null> = ref(null)

    watch(() => route.query, () => {
      setChat()
    })

    const messages: ComputedRef<Message[]> = computed(() => {
      if (chat.value) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        let bothMessages = chat.value.messages.sort((a, b) => {
          const dateA = Number(new Date(a.time))
          const dateB = Number(new Date(b.time))
  
          return dateB - dateA
        })

        return bothMessages
      }

      return []
    })

    function setChat(): void {
      chat.value = store.getters['messages/getChatById'](route.query.id)
    }

    function handleSend() {
      // sending
    }

    function init(): void {
      if (route.query.id) {
        setChat()
      }
    }

    onMounted(() => {
      init()
    })

    return {
      chat,
      messages,
      handleSend,
      inputMessage,
      account: computed(() => store.getters['profile/getAccount'])
    }
  }
})
</script>

<style lang="stylus" module>
.chat {
  &-preview {
    display flex
    justify-content center

    height 100%
    padding-top 30rem
    font-size 20px
  }

  &-box {
    position relative
    display flex
    justify-content center
    align-items center
    height 95%
    width 100%
    margin 0 auto
  }
}

.input {
  &-box {
    display flex
    align-items center
    position absolute
    width 88%
    justify-content space-between
    bottom 0

    &__image {
      min-height 50px
      min-width 50px
      background-size cover 
      border-radius 50%
    }

    &__input {
      outline none
      background var(--color-secondary)
      color var(--color-light)
      border none
      border-bottom 2px solid rgba(0, 0, 0, 0.5)
      padding-bottom 3rem
      width 58rem

      transition 0.2s ease

      &::placeholder {
        color var(--color-light)
        font-weight 700
        transition 0.2s ease
      }

      &:focus {
        border-bottom 2px solid rgba(0, 0, 0, 1)

        &::placeholder {
          opacity 0.8
        }
      }
    }
  }
}

.chat-messages {
  width 100%
  position absolute
  bottom 12rem
  height 65vh
  overflow-y scroll
  padding-left 5rem

  &::-webkit-scrollbar { width: 2px; height: 3px;}
  &::-webkit-scrollbar-track { background-color: #fff;}
  &::-webkit-scrollbar-track-piece { background-color: var(--color-secondary-light);}
  &::-webkit-scrollbar-thumb { height: 50px; background-color: var(--color-light-2); border-radius: 3px;}
  &::-webkit-scrollbar-corner { background-color: #fff;}
  &::-webkit-resizer { background-color: #fff;}
}

.chat-message {
  display flex
  margin-top 2rem

  &__box {
    margin-left 1rem
    display flex
    flex-direction column
    margin-top .5rem
  }

  &__name {
    font-weight 700
    font-size 1.2rem
  }

  &__text {
    margin-top 1rem
    font-size 1.2rem
  }
}
</style>