<template>
  <div :class="[$style['form-item'], { [$style.error]: isValidate.isError }]">
    <label :for="id" :class="$style.inp">
      <slot />
      <span :class="$style.label">{{ name }}</span>
      <span :class="$style['focus-bg']"></span>
    </label>
    <div v-if="isValidate.isError" :class="$style['error-message']">
      {{ isValidate.message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'isValidate', 'id'],
}
</script>

<style lang="stylus" module>
.form-item {
  margin-bottom: 2rem;
  width: 100%;
}

.inp {
  height: 56px;
  position: relative;
  width: inherit;
  input {
    padding: 16px 12px 0 12px;
    height: inherit;
    width: inherit;
    border: none;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .3);
    background: rgba(0, 0, 0, 0.3);
    font-weight: 400;
    appearance: none;
    transition: all 0.15s ease;
    font-size: 1.4rem;
    color: var(--color-primary);

    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.5);
      box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5);
    }

    &:focus {
      background: rgba(0, 0, 0, 0.4);
      outline: none;
      box-shadow: inset 0 -2px 0 var(--color-primary);
    }
  }

  .label {
    position: absolute;
    top: -6px;
    left: 12px;
    font-size: 1.6rem;
    color: rgba(117,117,117 ,1);
    font-weight: 500;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    pointer-events: none;
  }

  .focus-bg {
    position: absolute;
    left: 0;
    width: 100%;
    height: inherit;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: left;
    transform-origin: left;
  }

  input:focus + .label {
    color: var(--color-primary);
    -webkit-transform: translate3d(0, -18px, 0) scale(0.75);
    transform: translate3d(0, -18px, 0) scale(0.75);
  }

  input:focus + .label + .focus-bg {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    -webkit-transition: all 0.1s ease;
    transition: all 0.1s ease;
  }

  input:not(:placeholder-shown) + .label {
  color: rgba(0, 0, 0, 1);
  -webkit-transform: translate3d(0, -18px, 0) scale(0.75);
          transform: translate3d(0, -18px, 0) scale(0.75);
  }
}

.error {
  input {
    box-shadow: inset 0 -1px 0 var(--color-error);
    background: rgba(255,23,68, .1);
    color: var(--color-error);

    &:hover {
      background: rgba(255,23,68, .14);
    }

    &:focus {
      background: rgba(255,23,68, .18);
      box-shadow: inset 0 -2px 0 var(--color-error);
    }
  }

  .label {
    color: var(--color-error);
  }

  input:focus + .label {
    color: var(--color-error);
  }

  input:not(:placeholder-shown) + .label {
    color: var(--color-error);
  }

}

.error-message {
  text-align: left;
  height: 0;
  color: var(--color-error);

  opacity: 0;
  visibility: hidden;

  transition: all .3s ease;
  animation: show 1s 0.3s forwards, hide 1s 5s forwards;
}

@keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 100%;
    visibility: visible;
  }
}

@keyframes hide {
  0% {}

  100% {
    opacity: 0;
    visibility: hidden;
  }

}
</style>
