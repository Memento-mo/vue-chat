export interface Account {
  last_name: string
  first_name: string
  avatar: string
  email: string
  id: string
}

export interface State {
  account: Account
}

export interface AccountResponse {
  data: Account
}