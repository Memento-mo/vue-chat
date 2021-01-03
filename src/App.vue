<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
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
  --color-primary:  rgba(255,152,0, 1);
  --color-error: #ff1744;
}
</style>
