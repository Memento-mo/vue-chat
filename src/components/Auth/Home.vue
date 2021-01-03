<template>
  <router-view />
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const isAuth = ref(false)
    const router = useRouter()

    function init () {
      if (!isAuth.value) {
        return router.replace({ name: 'login' })
      }

      return router.replace('/')
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
  margin-right: 10px;
  font-size: 16px;
}

.control_panel {
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 30px;
}
</style>