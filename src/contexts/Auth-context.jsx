import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { postFunval, getFunval } from '../api/funval/services.js'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authenticating, setAuthenticating] = useState(false)
  const navigate = useNavigate()

  /* Profile function */
  const fetchUserProfile = async () => {
    try {
      const res = await getFunval('/auth/profile')
      setUser(res.data)
      Cookies.set('user', JSON.stringify(res.data), {
        expires: 1,
        sameSite: 'strict',
        secure: window.location.protocol === 'https:',
      })
      return res.data
    } catch (error) {
      setUser(null)
      Cookies.remove('user')
      return null
    }
  }

  /* Login */
  const login = async ({ email, password }) => {
    try {
      setAuthenticating(true)
      const res = await postFunval('/auth/login', { email, password })

      if (res.data.status === 'success') {
        const profile = await fetchUserProfile()
        return profile
      } else {
        return null
      }
    } catch (error) {
      console.error('Error en login:', error)
      return null
    } finally {
      setAuthenticating(false)
    }
  }

  /* Logout */
  const logout = async () => {
    try {
      await postFunval('/auth/logout')
    } catch (error) {
      console.warn('Error cerrando sesión:', error)
    } finally {
      setUser(null)
      Cookies.remove('user')
      navigate('/login')
    }
  }

  /* Coockie SetUp */
  useEffect(() => {
    const storedUser = Cookies.get('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const isAuthenticated = !!user

  if (loading && !authenticating) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Verificando sesión...</p>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        fetchUserProfile,
        loading,
        authenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
