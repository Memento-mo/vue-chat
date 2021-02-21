<template>
  <div
    :class="$style['chats__search-icon']"
    class="row width-100 align-items-center justify-content-between"
  >
    <div clas>
      <div :class="$style['chats__search-icon__box']">
        <SearchSVG
          height="2"
          width="2"
        />
      </div>

      <InputText
        type="text"
        placeholder="Поиск"
        v-model="search"
      />
    </div>

    <div
      :class="$style['chats__search-icon-filter__box']"
      class="row justify-content-center align-items-center cursor-pointer"
    >
      <FilterSVG
        height="2"
        width="2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

import InputText from 'primevue/inputtext'

export default defineComponent({
  components: {
    InputText
  },
  setup() {
    const search: Ref<string> = ref('')

    return {
      search
    }
  }
})
</script>

<style lang="stylus" module>
.chats {
  &__search-icon {
    position relative

    &__box {
      position absolute
      top 50%
      transform translateY(-50%)
      left 10px
      
      svg {
        stroke var(--color-light-2)
      }
    }

    div:first-child {
      flex-basis 85%
    }

    :global(.p-inputtext) {
      border none
      border-radius var(--border-radius)
      padding-left 40px

      width 100%
      height 4.3rem

      background var(--color-primary-light)

      color var(--color-primary-light-7)
      font-size 1.2rem

      &::placeholder {
        font-size 1.2rem
        color var(--color-primary-light-7)
      }

      &:enabled:focus {
        outline none
        box-shadow none
      }
    }

    &-filter__box {
      background var(--color-primary-light)
      align-self stretch
      padding 5px 13px
      border-radius var(--border-radius)
      transition var(--transition-base)

      &:hover {
        background-color var(--color-primary-light-3)

        svg {
          stroke var(--color-light-2)
        }
      }

      svg {
        stroke var(--color-icon)
        transition var(--transition-base)
      }
    }
  }
}
</style>