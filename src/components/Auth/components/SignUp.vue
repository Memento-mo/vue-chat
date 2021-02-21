<template>
  <SignWrapper
    title="Sign Up"
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
import { reactive, ref, provide, defineComponent, Ref } from 'vue'

import SignWrapper from './SignWrapper.vue'

import Toast from 'primevue/toast'

import validator from 'email-validator'

import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast'
import { useAxios } from '@api/api'
import { IErrors, IField, IForm, HTMLElementEvent } from '@/types/auth/signIn'
import { Tokens } from '@/types/store/auth'
import { AxiosResponse } from 'axios'

type Fields = 'login' | 'password' | 'firstName' | 'lastName' | 'email'

export default defineComponent({
  setup() {
    const $http = useAxios()
    const store = useStore()
    const toast = useToast()

    const isLoading: Ref<boolean> = ref(false)

    let isError: Ref<boolean> = ref(true)

    const fields: IField[] = [
      { field: 'login', placeholder: 'Login' },
      { field: 'firstName', placeholder: 'First name' },
      { field: 'lastName', placeholder: 'Last name' },
      { field: 'email', placeholder: 'Email' },
      { field: 'password', placeholder: 'Password' },
    ]
    const errors: IErrors = reactive({
      email: { isError: false, message: 'Неправильный почтовый адрес' },
      login: {
        isError: false,
        message: 'Длина не должна быть равна 0 и не быть больше 10 символов',
      },
      password: {
        isError: false,
        message: 'Пароль должен быть не менее 7-ми символов',
      },
      firstName: {
        isError: false,
        message: 'Имя должно быть больше 0'
      },
      lastName: {
        isError: false,
        message: 'Фамилия должна быть больше 0'
      }
    })

    const form: IForm = reactive({ login: '', password: '', email: '', firstName: '', lastName: ''})

    function setLoading (is: boolean): void {
      isLoading.value = is
    }

    function submit (e: Event): void {
      setLoading(true)

      e.preventDefault()

      $http.post('/registration', form)
        .then(({ data }: AxiosResponse<Tokens>) => {
          store.dispatch('auth/setToken', { token: data.token, refreshToken: data.refreshToken })

          toast.add({ severity:'success', summary: 'Success', detail:'Account created successfully', life: 3000 })
        })
        .catch((e) => {
          toast.add({ severity:'error', summary: 'Error', detail:'Account creation failed', life: 3000 })
        })
        .finally(() => {
          setLoading(false)
        })
    }

    function inputChange <T extends keyof Pick<IForm, Fields>>(val: HTMLElementEvent<HTMLTextAreaElement>, input: T): void {
      form[input] = val.target.value
      validateForm(input, val.target.value)
    }

    function validateForm (type: Fields, value: string): void {
      const { email, login, password, firstName, lastName } = errors
      switch (type) {
        case 'login':
          login.isError = value.length > 10 || value.length === 0
          break
        case 'email':
          email.isError = !validator.validate(value)
          break
        case 'password':
          password.isError = value.length < 7
          break
        case 'firstName':
          firstName.isError = value.length === 0
          break
        case 'lastName':
          lastName.isError = value.length === 0
        default:
          break
      }

      const getKeys = Object.keys as <T extends Pick<IErrors, Fields> | Pick<IForm, Fields>>(obj: T) => Array<keyof T>

      const someError = getKeys(errors).some(value => errors[value].isError)
      const someLengthEqualZero = getKeys(form).some(value => form[value].length === 0)

      someError || someLengthEqualZero ? isError.value = true : isError.value = false
    }

    provide('isLoading', isLoading)

    return { form, fields, inputChange, errors, isError, submit }
  },
  components: {
    Toast,
    SignWrapper
  },
})
</script>
