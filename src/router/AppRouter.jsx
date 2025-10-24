import { Routes, Route } from 'react-router'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import ServiceHourLayout from '../layouts/ServiceHourLayout'
import RolesPage from '../pages/RolesPage'
import ServiceHoursPage from '../pages/ServiceHoursPage'
import CategoriesPage from '../pages/CategoriesPage'
import SchoolsPage from '../pages/SchoolsPage'
import UsersPage from '../pages/UsersPage'
import UserFormPage from '../pages/UserFormPage'
import StudentsPage from '../pages/StudensPage'
import MenuPage from '../pages/MenuPage'
import PermissionsPage from '../pages/PermissionsPage'
import ServicesListPage from '../pages/ServicesListPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />

      <Route element={<ServiceHourLayout />}>
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/schools" element={<SchoolsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserFormPage />} />
        <Route path="/service-hours" element={<ServicesListPage />} />
        <Route path="/service-hours/:id" element={<ServiceHoursPage />} />
        <Route path="/configuracion/menus" element={<MenuPage />} />
        <Route
          path="/configuracion/permissions"
          element={<PermissionsPage />}
        />
      </Route>
    </Routes>
  )
}
