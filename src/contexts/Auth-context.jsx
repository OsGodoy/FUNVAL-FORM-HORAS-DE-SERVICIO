import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { postFunval, getFunval } from '../api/funval/services.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  /* Login */
  const login = async ({ email, password }) => {
    try {
      setLoading(true)
      const response = await postFunval('/auth/login', { email, password })
      if (response.data.status === 'success') {
        const profileResponse = await getFunval('/auth/profile')
        const p = profileResponse.data
        const loggedUser = {
          id: p.id,
          name: p.f_name,
          middlename: p.m_name,
          lastname: p.f_lastname,
          email: p.email,
          phone: p.phone,
          role: p.role_id === 1 ? 'admin' : 'client',
          status: p.status,
        }
        setLoading(false)
        setUser(loggedUser)

        navigate('/home')
      } else {
        setLoading(false)
        throw new Error(response.data.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      setLoading(false)
      console.error('Error en login:', error)
      throw error
    }
  }

  /* Log out */
  const logout = async () => {
    try {
      if (user?.token) {
        await postFunval('/auth/logout', null, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      }
    } catch (error) {
      console.warn('Error cerrando sesión:', error)
    } finally {
      setUser(null)
      navigate('/login')
    }
  }

  /* Authenticated */
  const isAuthenticated = !!user

  /* Loading page */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Cargando...</p>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
