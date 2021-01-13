export interface Message {
  id: string
  message: string
  my: boolean
  time: number
}

export interface Chat {
  avatar: string
  first_name: string
  id: string
  last_message: {
    text: string
    time: number
  }
  messages: Message[]
}

export interface State {
  chats: Chat[]
}

export interface ChatsResponse {
  data: {
    chats: Chat[]
  }
}
