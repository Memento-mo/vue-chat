<template>
  <div :class="$style.registration">
    <h1 :class="$style.welcome">{{ title }}</h1>

    <Form
      width="500px"
      :submit="submit"
    >
      <FormItem
        :key="index"
        v-for="(item, index) in fields"
        :isValidate="errors[item.field]"
        :name="item.placeholder"
        :id="item.field"
      >
        <Input
          :name="item.field"
          :value="form[item.field]"
          @input="(val) => inputChange(val, item.field)"
          :type="item.field === 'password' ? 'password' : 'text'"
        />
      </FormItem>
      
      <Button :disabled="isError" label="Send" />

      <footer :class="$style.footer">
        <div
          v-show="isLogin"
          :class="$style.footer__text"
        >
          Don't have an account?
          <router-link
            :class="$style.footer__link"
            :to="{ name: 'registration' }"
          >
            Sign Up
          </router-link>
        </div>

        <div
          v-show="isRegistration"
          :class="$style.footer__text"
        >
          Do you have an account?
          <router-link
            :class="$style.footer__link"
            :to="{ name: 'login' }"
          >
            Sign In
          </router-link>
        </div>
      </footer>
    </Form>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch, defineComponent, ComputedRef } from 'vue'

import Form from '@components-ui/Form/Form.vue'
import FormItem from '@components-ui/Form/FormItem.vue'
import Input from '@components-ui/Form/Input.vue'
import Button from '@components-ui/Form/Button.vue'
import { useRoute } from 'vue-router'

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: 'Title'
      },
      submit: {
        type: Function
      },
      fields: {
        type: Array,
        requiered: true
      },
      errors: {
        type: Object
      },
      inputChange: {
        type: Function
      },
      form: {
        type: Object
      },
      isError: {
        type: Boolean
      }
    },
    setup () {
      const route = useRoute()

      const isLogin: ComputedRef<boolean> = computed(() => route.name === 'login')

      const isRegistration: ComputedRef<boolean> = computed(() => route.name === 'registration')

      return {
        isLogin,
        isRegistration
      }
    },
    components: {
      Form,
      Input,
      FormItem,
      Button
    }
  })
</script>

<style lang="stylus" module>
.registration {
  text-align: center;
  max-width: 60rem;
  padding: 4rem;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);

  color: rgba(224,224,224 ,1);
  background-color: var(--color-secondary);

  -webkit-box-shadow: 0px 0px 35px 2px rgba(26,23,26,1);
  -moz-box-shadow: 0px 0px 35px 2px rgba(26,23,26,1);
  box-shadow: 0px 0px 35px 2px rgba(26,23,26,1);
}

.welcome {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.footer {
  &__text {
    font-size: 14px;
    margin-top: 10px;
  }

  &__link {
  color: var(--color-primary);
  font-size: 14px;
  }
}
</style>