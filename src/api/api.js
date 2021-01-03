import store from '../store'
import axios from 'axios'

let refreshTokenPromise

const createUpdateAuthInterceptor = (http) => async error => {
  if (error.response.status === 403) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = store.dispatch('auth/verifyToken')
    }
    
    refreshTokenPromise = await refreshTokenPromise
      .then(() => null)
      .catch(() => null)
    
    error.config.headers.Authorization = store.getters['auth/getToken']

    return http(error.config)
  }
  
  if(error.response.status === 401) {
    console.log('LOGIN PLEASE')
  }
  
  return Promise.reject(error)
}

const updateAuthCb = createUpdateAuthInterceptor(axios)

const api = axios.create({
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

api.interceptors.response.use(null, updateAuthCb)

export function useAxios () {
  return api
}