import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { getData } from '../../api/local/services'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth-context'

export default function Sidebar({ collapsed, setCollapsed }) {
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const location = useLocation()
  const { user: userSesion } = useAuth()

  const toggleSubmenu = (name) => {
    setOpenSubmenu((prev) => (prev === name ? null : name))
  }

  const getMenuItems = async () => {
    setIsLoading(true)
    try {
      const cachedMenu = localStorage.getItem('menuItems')

      if (cachedMenu) {
        const parsed = JSON.parse(cachedMenu)
        const filtered = filterMenuByRoleAndStatus(parsed)
        setMenuItems(filtered)
      } else {
        const response = await getData('/menus.json')
        const data = response.data
        const filtered = filterMenuByRoleAndStatus(data)

        setMenuItems(filtered)
        localStorage.setItem('menuItems', JSON.stringify(filtered))
      }
    } catch (error) {
      setError(error)
      console.error('Error fetching menu items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterMenuByRoleAndStatus = (items) => {
    const userRole = userSesion?.role?.name?.toLowerCase()
    if (!userRole) return []

    return items
      .filter(
        (item) =>
          item.status === true &&
          item.deleted === false &&
          item.roles?.includes(userRole)
      )
      .map((item) => {
        if (item.children?.length) {
          const children = item.children.filter(
            (child) =>
              child.status === true &&
              child.deleted === false &&
              child.roles?.includes(userRole)
          )
          return { ...item, children }
        }
        return item
      })
  }

  useEffect(() => {
    if (menuItems.length === 0) return

    const activeParent = menuItems.find((item) =>
      item.children?.some((child) => child.url === location.pathname)
    )

    if (activeParent) {
      setOpenSubmenu(activeParent.name)
    } else {
      setOpenSubmenu(null)
    }
  }, [location.pathname, menuItems])

  useEffect(() => {
    getMenuItems()
  }, [])

  if (isLoading) return <div className="p-4">Cargando menú...</div>
  if (error)
    return <div className="p-4 text-red-500">Error al cargar el menú.</div>

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white shadow-md h-full flex flex-col border-r border-gray-100"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-hidden h-7">
          <motion.img
            src="/images/iso-tipo-funval.png"
            alt="isotipo logo"
            className="w-6 h-6 flex-shrink-0"
          />
          <AnimatePresence>
            {!collapsed && (
              <Link to={'/home'}>
                <motion.img
                  key="text-logo"
                  src="/images/funval-logo.svg"
                  alt="logo"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="h-5"
                />
              </Link>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer hover:bg-gray-100 rounded-md transition"
          title={collapsed ? 'Expandir' : 'Colapsar'}
        >
          <Icons.PanelLeftClose
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            const Icon = Icons[item.icon] || Icons.Circle

            const isParentActive = item.children?.some(
              (child) => child.url === location.pathname
            )

            if (item.children && item.children.length > 0)  {
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition 
                      ${collapsed ? 'justify-center' : ''}
                      ${
                        isParentActive
                          ? 'bg-indigo-50 text-[#155CFD]'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left font-medium">
                          {item.name}
                        </span>
                        <Icons.ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openSubmenu === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {openSubmenu === item.name && !collapsed && (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-8 border-l border-gray-200"
                      >
                        {item.children
                          .sort((a, b) => a.order - b.order)
                          .map((child) => {
                            const ChildIcon = Icons[child.icon] || Icons.Circle
                            return (
                              <Link
                                key={child.name}
                                to={child.url}
                                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition
                                  ${
                                    location.pathname === child.url
                                      ? 'bg-blue-50 text-[#155CFD]'
                                      : 'text-gray-600 hover:bg-gray-50'
                                  }`}
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span>{child.name}</span>
                              </Link>
                            )
                          })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <Link
                key={item.name}
                to={item.url}
                className={`flex items-center gap-3 px-4 py-2 font-medium transition rounded-md
                  ${collapsed ? 'justify-center' : ''}
                  ${
                    location.pathname === item.url
                      ? 'bg-blue-50 text-[#155CFD]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
      </nav>
    </motion.aside>
  )
}
