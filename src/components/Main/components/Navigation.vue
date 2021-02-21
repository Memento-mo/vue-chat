<template>
  <div :class="$style.loader">
    <Loader />
  </div>
  <div class="row align-items-center justify-content-between flex-direction-column height-90">
    <div
      class="row align-items-center justify-content-center flex-direction-column height-90"
      :class="$style['navigation-box']"
    >
      <div 
        class="cursor-pointer"
        :class="$style['icon-box']"
      >
        <ChatSVG
          height="2.2"
          width="2.2"
        />
      </div>

      <div
        class="cursor-pointer"
        :class="$style['icon-box']"
      >
        <HeartSVG
          height="2.2"
          width="2.2"
        />
      </div>

      <div
        class="cursor-pointer"
        :class="$style['icon-box']"
      >
        <UserSVG
          height="2.2"
          width="2.2" 
        />
      </div>

      <div
        class="cursor-pointer"
        :class="$style['icon-box']"
      >
        <CogSVG
          height="2.2"
          width="2.2"
        />
      </div>
    </div>
    <div :class="$style.account" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from 'vue'
import Loader from '@components-base/Loader/Loader.vue'

export default defineComponent({
  components: {
    Loader,
  },
})
</script>

<style lang="stylus" module>
.loader {
  height 5rem
}
.navigation-box {}

.icon-box {
  margin-bottom 1rem

  padding 1.3rem
  border-radius 8px
  transition var(--transition-base)
  background-color var(--color-primary-light-6)

  svg {
    transition var(--transition-base)

    stroke var(--color-icon)
  }

  &:hover {
    background-color var(--color-primary-light-3)

    svg {
      stroke var(--color-light-2)
    }
  }
}

.account {
  position relative
  height 5rem
  width 5rem
  border-radius 50%
  background-color var(--color-primary)

  &::after {
    position absolute
    top 2px
    right 4px
    content ''
    height 8px
    width 8px
    border-radius 50%
    background-color var(--color-third)
  }
}
</style>
