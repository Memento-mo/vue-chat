<template>
  <SignWrapper
    title="Sign In"
    :submit="submit"
    :fields="fields"
    :errors="errors"
    :inputChange="inputChange"
    :form="form"
    :isError="isError"
  />

  <Toast position="top-center" />
</template>

<script lang="ts">

import { ref, reactive, provide, onMounted, defineComponent, Ref } from 'vue'

import SignWrapper from './SignWrapper.vue'

import Form from '@components-ui/Form/Form.vue'
import FormItem from '@components-ui/Form/FormItem.vue'
import Input from '@components-ui/Form/Input.vue'
import Button from '@components-ui/Form/Button.vue'

import Toast from 'primevue/toast.js'

import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast.js'
import { useAxios } from '@api/api'
import { useRouter } from 'vue-router'

import { IErrors, IField, IForm, HTMLElementEvent } from '@/types/auth/signIn'
import { Tokens } from '@/types/store/auth'
import { AxiosResponse } from 'axios'

type Fields = 'login' | 'password'

export default defineComponent({
  setup() {
    const $http = useAxios()
    const store = useStore()
    const toast = useToast()
    const router = useRouter()

    const isLoading: Ref<boolean> = ref(false)

    const isError: Ref<boolean> = ref(true)

    const errors: Pick<IErrors, 'login' | 'password'> = reactive({
      login: {
        isError: false,
        message: 'Длина не должна быть равна 0 и не быть больше 10 символов',
      },
      password: {
        isError: false,
        message: 'Пароль должен быть не менее 7-ми символов',
      }
    })

    const fields: Array<IField> = [
      { field: 'login', placeholder: 'Login' },
      { field: 'password', placeholder: 'Password' }
    ]

    const form: Pick<IForm, Fields> = reactive({ login: '', password: '' })

    function inputChange<T extends keyof Pick<IForm, Fields>> (val: HTMLElementEvent<HTMLTextAreaElement>, input: T): void {
      form[input] = val.target.value
      validateForm(input, val.target.value)
    }

    function validateForm (type: Fields, value: string): void {
      const { login, password } = errors
      switch (type) {
        case 'login':
          login.isError = value.length > 10 || value.length === 0
          break
        case 'password':
          password.isError = value.length < 7
          break
        default:
          break
      }
      const getKeys = Object.keys as <T extends Pick<IErrors, Fields> | Pick<IForm, Fields>>(obj: T) => Array<keyof T>

      const someError = getKeys(errors).some((value) => errors[value].isError)
      const someLengthEqualZero = getKeys(form).some(value => form[value].length === 0)

      someError || someLengthEqualZero ? isError.value = true : isError.value = false
    }

    function setLoading (is: boolean): void {
      isLoading.value = is
    }

    function submit (e: Event): void {
      setLoading(true)

      e.preventDefault()

      $http.post('/login', form)
        .then(({ data }: AxiosResponse<Tokens>) => {
          store.dispatch('auth/setToken', { token: data.token, refreshToken: data.refreshToken })

          router.replace({ name: 'messages' })
          toast.add({ severity:'success', summary: 'Success', detail:'You have successfully logged in', life: 3000 })
        })
        .catch((e) => {
          toast.add({ severity:'error', summary: 'Error', detail:'The account does not exist or you entered an incorrect password', life: 3000 })
        })
        .finally(() => {
          setLoading(false)
        })
    }

    function init (): void {
      const token: Pick<Tokens, 'token'> = store.getters['auth/getToken']

      if (token) {
        router.replace({ name: 'messages' })
      }
    }

    onMounted(() => {
      init()
    })

    provide('isLoading', isLoading)

    return {
      fields,
      inputChange,
      errors,
      form,
      isError,
      submit
    }
  },
  components: {
    SignWrapper,
    Toast
  }
})
</script>