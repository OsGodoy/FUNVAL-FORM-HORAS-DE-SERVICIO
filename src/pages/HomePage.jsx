import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth-context'
import HeaderHome from '../components/Home-components/header-home-s'
import Courses from '../components/Home-components/courses'
import Footer from '../components/Home-components/footer-home'

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [loading, isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Cargando tu información...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <HeaderHome />
      <Courses />
      <Footer />
    </>
  )
}
