<template>
  <button 
    :class="$style.button"
  >
    <Loading width="17px" height="17px" v-if="isLoading"/>

    <div v-else >
      {{ label }}
    </div>
  </button>
</template>

<script>
import { inject } from 'vue'

import Loading from '../Loading/Loading.vue'

export default {
  props: ['label'],
  setup() {
    const isLoading = inject('isLoading')

    return { isLoading }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" module>
.button {
  padding: 1rem 1.2rem;
  min-width: 95px;
  min-height: 40px;
  border: 1px solid var(--color-primary);
  border-radius: .5rem;
  background: var(--color-primary);
  color: #fff;
  font-weight: 400;
  cursor: pointer;
  transition: all .3s ease;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: var(--color-primary);
    cursor: default;
    opacity: 0.6;

    &:hover {
      background: var(--color-primary);
      color: #fff;
    }
  }
}
</style>
