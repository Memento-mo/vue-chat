export interface IErrors {
  login: {
    isError: boolean
    message: string
  }
  password: {
    isError: boolean
    message: string
  }
  firstName: {
    isError: boolean
    message: string
  }
  lastName: {
    isError: boolean
    message: string
  }
  email: {
    isError: boolean
    message: string
  }
}

export interface IField {
  field: string
  placeholder: string
}

export interface IForm {
  login: string
  password: string
  email: string
  firstName: string
  lastName: string
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T; 
}