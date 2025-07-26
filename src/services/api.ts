import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

// Interceptor: insere o token sempre antes da requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')?.replace(/"/g, '')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
