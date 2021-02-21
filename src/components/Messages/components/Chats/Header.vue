<template>
  <div class="row align-items-center justify-content-between select-none">
    <div
      :class="$style['chats__title']"
      class="m-right-12"
    >
      <h1>Сообщения</h1>
    </div>

    <div
      :class="$style['chats__count']"
      class="row align-items-center justify-content-center"
    >
      <h3>
        5
      </h3>
    </div>
  </div>

  <div
    :class="$style['chats__new']"
    class="row justify-content-between align-items-center cursor-pointer"
  >
    <div
      :class="$style['chats__new-icon']"
      class="row align-items-center justify-content-center"
    >
      <h3>
        +
      </h3>
    </div>

    <div :class="$style['chats__new-text']">
      <h3>Добавить чат</h3>
    </div>
  </div>
</template>

<style lang="stylus" module>
.chats {
  &__title {
    h1 {
      font-size 2.4rem
    }
  }

  &__count {
    height 2rem
    width 2rem
    background-color var(--color-secondary)
    padding .5rem
    border-radius 50%
  }

  &__new {
    width 10.4rem
    transition var(--transition-base)
    color var(--color-primary-light-7)

    &-icon {
      height 1.8rem
      width 1.8rem
      border-radius 0.4rem
      transition var(--transition-base)
      background-color var(--color-primary-light-2)

      h3 {
        font-weight 500
        font-size 1.4rem
        position relative
        top -1px
      }
    }

    &:hover {
      color var(--color-primary-light-5)
    }
  }
}
</style>