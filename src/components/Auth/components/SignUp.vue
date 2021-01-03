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

<script>
import { reactive, ref, provide } from 'vue'

import Form from '@components-ui/Form/Form.vue'
import FormItem from '@components-ui/Form/FormItem.vue'
import Input from '@components-ui/Form/Input.vue'
import Button from '@components-ui/Form/Button.vue'
import SignWrapper from './SignWrapper.vue'

import Toast from 'primevue/toast'

import validator from 'email-validator'

import { useStore } from 'vuex'
import { useToast } from 'primevue/usetoast.js'
import { useAxios } from '@api/api.js'

export default {
  setup() {
    const $http = useAxios()
    const store = useStore()
    const toast = useToast()

    const isLoading = ref(false)

    let isError = ref(true)
    const fields = [
      { field: 'login', placeholder: 'Login' },
      { field: 'firstName', placeholder: 'First name' },
      { field: 'lastName', placeholder: 'Last name' },
      { field: 'email', placeholder: 'Email' },
      { field: 'password', placeholder: 'Password' },
    ]
    const errors = reactive({
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

    const form = reactive({ login: '', password: '', email: '', firstName: '', lastName: ''})

    function setLoading (is) {
      isLoading.value = is
    }

    function submit (e) {
      setLoading(true)

      e.preventDefault()

      $http.post('/registration', form)
        .then(({ data }) => {
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

      const someError = Object.keys(errors).some(value => errors[value].isError)
      const someLengthEqualZero = Object.keys(form).some(value => form[value].length === 0)

      someError || someLengthEqualZero ? isError.value = true : isError.value = false
    }

    provide('isLoading', isLoading)

    return { form, fields, inputChange, errors, isError, submit }
  },
  components: {
    Toast,
    SignWrapper
  },
}
</script>
