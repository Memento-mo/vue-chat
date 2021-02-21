<template>
  <div :class="$style.app">
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
  },
}
</script>

<style lang="stylus" module>
* {
  padding 0
  margin 0
  box-sizing border-box
}

html {
  font-size 62.5%
}

body {
  font-family 'Open Sans', sans-serif
}

:root {
  --color-primary  rgba(28, 28, 33, 1)
  --color-primary-light rgba(40, 42, 48, 1)
  --color-primary-light-2 rgba(56, 56, 66, 1)
  --color-primary-light-3 rgba(49, 49, 57, 1)
  --color-primary-light-4 rgba(46, 45, 51, 1)
  --color-primary-light-5 rgba(81, 82, 92, 1)
  --color-primary-light-6 rgba(46, 45, 51, .4)
  --color-primary-light-7 rgba(96,94,104, 1)
  --color-secondary rgb(145, 8, 247)
  --color-secondary-light rgb(200, 164, 220)
  --color-secondary-dark rgb(82, 56, 117)
  --color-secondary-dark-2 rgb(49, 46, 83)
  --color-third rgb(92, 169, 57)
  --color-icon rgba(81, 82, 92, 1)

  --color-light rgba(238, 238, 238, 1)
  --color-light-2 rgba(117, 117, 117, 1)
  --color-error #ff1744
  
  --border-radius 8px
  --transition-base .3s ease
}

.app {
  height 100vh
  width 100%
  position absolute
  background-color var(--color-primary-light-2)
  z-index -2
}
</style>
