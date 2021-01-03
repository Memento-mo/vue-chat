import { mount, shallowMount, config } from '@vue/test-utils'

import SignUp from '../components/SignUp.vue'
import SignWrapper from '../components/SignWrapper.vue'

config.global.mocks = config.global.mocks || {}
config.global.mocks.$style = {}

describe('Sign up', () => {
  const wrapper = mount(SignUp, {
    stubs: {
      SignWrapper
    }
  })

  it('SignUp exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // const valueExists = async (selector, value) => {
  //   await wrapper.find(selector).setValue(value)

  //   expect(wrapper.find(selector).element.value).toEqual(value)
  // }

  // const setValue = async (selector, value) => {
  //   return wrapper.find(selector).setValue(value)
  // }

  // const checkToContain = (text) => {
  //   expect(wrapper.html()).toContain(text)
  // }

  // const checkNotToContain = (text) => {
  //   return expect(wrapper.html()).not.toContain(text)
  // }

  // describe('Inputs', () => {
  //   it('Inputs values exists', () => {
  //     valueExists('#login', 'Glebkaz')
  //     valueExists('#firstName', 'Gleb')
  //     valueExists('#lastName', 'Pologov')
  //     valueExists('#email', 'gpologov@gmail.com')
  //     valueExists('#password', '123456789')
  //   })
  // })

  // describe('Validation login', () => {
  //   describe('Invalid login', () => {
  //     it('Login is equal zero', async () => {
  //       await setValue('#login', '')
  //     })
    
  //     it('Login is more than 10 symbols', async () => {
  //       await setValue('#login', 'qwertyuioff')
  //     })
  
  //     afterEach(() => {
  //       checkToContain('Длина не должна быть равна 0 и не быть больше 10 символов')
  //     })
  //   })

  //   describe('Valid login', () => {
  //     it('Login greater than 0 and less than 10', async () => {
  //       await setValue('#login', 'Glebkaz')

  //       checkNotToContain('Длина не должна быть равна 0 и не быть больше 10 символов')
  //     })
  //   })
    
  // })

  // describe('Validation password', () => {
  //   describe('Invalid password', () => {
  //     it('Password less than 7 symbols', async () => {
  //       await setValue('#password', 'passwr')

  //       checkToContain('Пароль должен быть не менее 7-ми символов')
  //     })
  //   })
    
  //   describe('Valid password', () => {
  //     it('Password is more than 7 symbols', async () => {
  //       await setValue('#password', 'password')
  
  //       checkNotToContain('Пароль должен быть не менее 7-ми символов')
  //     })
  //   })
  // })

  // describe('Validation email', () => {
  //   it('Invalid email', async () => {
  //     await setValue('#email', 'gpologov@gm.f')

  //     checkToContain('Неправильный почтовый адрес')
  //   })

  //   it('Valid email', async () => {
  //     await setValue('#email', 'gpologov@gmail.com')


  //     checkNotToContain('Неправильный почтовый адрес')
  //   })
  // })

  // describe('Validation full name', () => {
  //   describe('Invalid full name', () => {
  //     it ('Invalid first name', async () => {
  //       await setValue('#firstName', '')

  //       checkToContain('Имя должно быть больше 0')
  //     })

  //     it('Invalid last name', async () => {
  //       await setValue('#lastName', '')


  //       checkToContain('Фамилия должна быть больше 0')
  //     })
  //   })

  //   describe('Valid full name', () => {
  //     it('Valid first name', async () => {
  //       await setValue('#firstName', 'Gleb')

  //       checkNotToContain('Имя должно быть больше 0')
  //     })

  //     it('Valid last name', async () => {
  //       await setValue('#lastName', 'Pologov')
        
  //       checkNotToContain('Фамилия должна быть больше 0')
  //     })
  //   })
  // })
  
})
