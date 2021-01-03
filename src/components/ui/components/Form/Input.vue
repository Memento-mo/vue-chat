<template>
  <input :type="type" :id="name" placeholder="&nbsp;" />
</template>

<script>
export default {
  props: ['type', 'placeholder', 'value', 'name'],
}
</script>
