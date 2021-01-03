<template>
  <div :style="{ height, width }" :class="$style.loader"></div>
</template>
<script>
export default {
  props: {
    width: String,
    height: String
  }
}
</script>
<style lang="stylus" module>
.loader {
  margin: 0 auto;
  border: 2.5px solid #f3f3f3;
  border-top: 2.5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>