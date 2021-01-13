import { AxiosResponse } from 'axios'

export interface ServerResponse {
  data: {
    token: string
    refreshToken: string
  }
}

export interface Error {
  response: {
    status: number
  }
  config: {
    headers: {
      Authorization: string
    }
  }
}

export type Interceptor = Promise<AxiosResponse | PromiseRejectionEvent | null>
