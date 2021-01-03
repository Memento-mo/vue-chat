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

<script>
import { ref, reactive, provide } from 'vue'

import SignWrapper from './SignWrapper.vue'

import Form from '@components-ui/Form/Form.vue'
import FormItem from '@components-ui/Form/FormItem.vue'
import Input from '@components-ui/Form/Input.vue'
import Button from '@components-ui/Form/Button.vue'

import Toast from 'primevue/toast.js'

import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast.js'
import { useAxios } from '@api/api.js'

export default {
  setup() {
    const $http = useAxios()
    const store = useStore()
    const isLoading = ref(false)
    const toast = useToast()

    const isError = ref(true)

    const errors = reactive({
      login: {
        isError: false,
        message: 'Длина не должна быть равна 0 и не быть больше 10 символов',
      },
      password: {
        isError: false,
        message: 'Пароль должен быть не менее 7-ми символов',
      }
    })

    const fields = [
      { field: 'login', placeholder: 'Login' },
      { field: 'password', placeholder: 'Password' }
    ]

    const form = reactive({ login: '', password: '' })

    function inputChange (val, input) {
      form[input] = val.target.value
      validateForm(input, val.target.value)
    }

    function validateForm (type, value) {
      const { email, login, password, firstName, lastName } = errors
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

      const someError = Object.keys(errors).some(value => errors[value].isError)
      const someLengthEqualZero = Object.keys(form).some(value => form[value].length === 0)

      someError || someLengthEqualZero ? isError.value = true : isError.value = false
    }

    function setLoading (is) {
      isLoading.value = is
    }

    function submit (e) {
      setLoading(true)

      e.preventDefault()

      $http.post('login', form)
        .then(({ data }) => {
          store.dispatch('auth/setToken', { token: data.token, refreshToken: data.refreshToken })

          toast.add({ severity:'success', summary: 'Success', detail:'You have successfully logged in', life: 3000 })
        })
        .catch(() => {
          toast.add({ severity:'error', summary: 'Error', detail:'The account does not exist or you entered an incorrect password', life: 3000 })
        })
        .finally(() => {
          setLoading(false)
        })
    }

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
}
</script>