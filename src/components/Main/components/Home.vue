<template>
  <router-view />
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    function init () {
      const token = store.getters['auth/getToken']

      if (!token) {
        return router.replace({ name: 'login' })
      }

      if (token && router.currentRoute.value.name === 'login') {
        return router.replace('/messages')
      }
    }
    
    onMounted(() => {
      init()
    })
  }
}
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