import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { getData } from "../../api/local/services";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Sidebar({ collapsed, setCollapsed }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const getMenuItems = async () => {
    setIsLoading(true);
    try {
      const response = await getData("/menus.json");
      setMenuItems(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching menu items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  if (isLoading) return <div className="p-4">Cargando menú...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error al cargar el menú.</div>;

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white shadow-md h-full flex flex-col border-r border-gray-100"
    >
      {/* LOGO */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-hidden h-7">
          <motion.img
            src="/images/iso-tipo-funval.png"
            alt="isotipo logo"
            className="w-6 h-6 flex-shrink-0"
          />
          <AnimatePresence>
            {!collapsed && (
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
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer hover:bg-gray-100 rounded-md transition"
          title={collapsed ? "Expandir" : "Colapsar"}
        >
          <Icons.PanelLeftClose
            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>


      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            const Icon = Icons[item.icon] || Icons.Circle;

            // --- Menú con submenús ---
            if (item.children) {
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded-md ${
                      collapsed ? "justify-center" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5 text-gray-600" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left font-medium">
                          {item.name}
                        </span>
                        <Icons.ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Submenús animados */}
                  <AnimatePresence>
                    {openSubmenu === item.name && !collapsed && (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-8 border-l border-gray-200"
                      >
                        {item.children
                          .sort((a, b) => a.order - b.order)
                          .map((child) => {
                            const ChildIcon =
                              Icons[child.icon] || Icons.Circle;
                            return (
                              <Link
                                key={child.name}
                                to={child.url}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                              >
                                <ChildIcon className="w-4 h-4 text-gray-500" />
                                <span>{child.name}</span>
                              </Link>
                            );
                          })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // --- Menú simple ---
            return (
              <a
                key={item.name}
                href={item.url}
                className={`flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium transition rounded-md ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <Icon className="w-5 h-5 text-gray-600" />
                {!collapsed && <span>{item.name}</span>}
              </a>
            );
          })}
      </nav>
    </motion.aside>
  );
}
