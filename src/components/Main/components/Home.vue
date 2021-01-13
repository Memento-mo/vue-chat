<template>
  <router-view />
</template>

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { Tokens } from '@/types/store/auth'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    function init (): void {
      const token: Pick<Tokens, 'token'> = store.getters['auth/getToken']

      if (!token) {
        router.replace({ name: 'login' })

        return
      }

      if (token && router.currentRoute.value.name === 'login') {
        router.replace('/messages')

        return
      }
    }
    
    onMounted(() => {
      init()
    })
  }
})
</script>

<style lang="stylus" module>
a {
  text-decoration: none;
  color: #000;
}

.control_panel {
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 30px;
}
</style>