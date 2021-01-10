<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'App',
  setup() {
    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
      if (route.path === '/') {
        router.replace({ name: 'login' })
      }
    })
  }
}
</script>

<style lang="stylus" module>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Open Sans', sans-serif;
}

:root {
  --color-light rgba(238,238,238, 1)
  --color-light-2 rgba(117,117,117, 1)
  --color-primary  rgba(255,152,0, 1)
  --color-primary-light rgba(255,167,38, .4)
  --color-primary-dark rgba(251,192,45, 1)
  --color-secondary rgba(33,33,33, 1)
  --color-secondary-light rgba(66,66,66,1)
  --color-error #ff1744
}
</style>
