import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ServiceHoursPage from './pages/ServiceHoursPage'
import ServiceHourLayout from './layouts/ServiceHourLayout'
import RolesPage from './pages/RolesPage'
import { AuthProvider } from './contexts/Auth-context'

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />

          <Route element={<ServiceHourLayout />}>
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/service-hours" element={<ServiceHoursPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}
