<template>
  <form :style="{ width }" :class="$style.form" @submit="submit">
    <slot />
  </form>
</template>

<script>
export default {
  props: {
    width: String,
    submit: Function
  }
}
</script>

<style lang="stylus" module>
.form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
