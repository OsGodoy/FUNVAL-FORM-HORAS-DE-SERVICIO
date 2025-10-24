import axios from 'axios'
import config from './config.js'

const client = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  withCredentials: true,
})

function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const [name] = cookie.split('=')
    document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}

function handleLogout() {
  console.warn('Sesión expirada o token inválido. Cerrando sesión...')
  clearCookies()
  localStorage.removeItem('isAuthenticated')
  window.location.replace('/login')
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const requestUrl = error.config?.url || ''
      if (error.response.status === 401) {
        const requestUrl = error.config?.url || ''
        if (requestUrl.includes('/auth/login')) {
          return Promise.reject(error)
        }

        if (!requestUrl.includes('/auth/register')) {
          handleLogout()
        }
      } else if (error.response.status >= 500) {
        console.error('Error en el servidor:', error.response.statusText)
      }
    } else {
      console.error('Error de conexión o timeout')
    }
    return Promise.reject(error)
  }
)

export default client
