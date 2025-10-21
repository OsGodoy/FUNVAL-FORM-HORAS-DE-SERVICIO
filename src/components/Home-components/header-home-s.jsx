import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Página Principal', path: '' },
    { name: 'Área personal', path: '' },
    { name: 'Mis cursos', path: '' },
  ]

  return (
    <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center relative z-50">
      {/* Left side */}
      <div className="flex items-center gap-6">
        <NavLink to="/" className="w-28">
          <img
            src="/images/funval-logo.svg"
            alt="Funval logo"
            className="object-contain w-full"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-blue-600 ${
                  isActive ? 'font-semibold text-black' : ''
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 hidden sm:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>

        {/* Message icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 hidden sm:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-1"
          >
            <span className="text-sm font-semibold bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
              PS
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 transition-transform duration-300 ${
                userMenuOpen ? 'rotate-180' : ''
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Actualizar perfil
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Cambiar contraseña
                </li>
                <li className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer">
                  Cerrar sesión
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden">
          <nav className="flex flex-col text-gray-700 p-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-blue-600 ${
                    isActive ? 'font-semibold text-black' : ''
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
