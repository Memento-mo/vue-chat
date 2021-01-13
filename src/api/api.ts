import store from '../store'
import axios, { AxiosInstance } from 'axios'
import { ServerResponse, Interceptor, Error } from '@/types/api/types'
import router from '../router'

let refreshTokenPromise: Promise<ServerResponse>

const createUpdateAuthInterceptor = (http: AxiosInstance) => async (error: Error): Interceptor => {
  if (error.response.status === 403) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = store.dispatch('auth/verifyToken')
    }
    
    refreshTokenPromise = await refreshTokenPromise
      .then(({ data }) => {
        return store.dispatch('auth/setToken', { token: data.token, refreshToken: data.refreshToken })
      })
      .catch(() => null)
    
    error.config.headers.Authorization = store.getters['auth/getToken']

    return http(error.config)
  }
  
  if(error.response.status === 401) {
    router.replace({ name: 'login' })

    return null
  }
  
  return Promise.reject(error)
}

const updateAuthCb: (error: Error) => Interceptor = createUpdateAuthInterceptor(axios)

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  }
})

api.interceptors.request.use(response => {
  response.headers['Access-Control-Allow-Origin'] = '*'

  response.headers.Authorization = store.getters['auth/getToken']

  return response
})

api.interceptors.response.use((val) => val, updateAuthCb)

export const useAxios = (): AxiosInstance => {
  return api
}