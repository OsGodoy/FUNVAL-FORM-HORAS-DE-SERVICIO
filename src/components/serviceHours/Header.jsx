import { useState } from "react";
import { Bell, MessageCircle, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/Auth-context";
import ChangePassword from "../shared/ChangePassword";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white shadow-sm px-8 py-3">
        <div className="flex items-center gap-8"></div>

        {/* User menu */}
        <div className="flex items-center gap-4 relative">
          {/* Bell icon */}
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />

          {/* Message icon */}
          <MessageCircle className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />

          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
              {/* Name initials */}
              <span className="text-sm font-semibold">{`${user.f_name[0]}${user.f_lastname[0]}`}</span>

              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <ul className="text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setShowPasswordModal(true);
                      setUserMenuOpen(false);
                    }}
                  >
                    Actualizar perfil
                  </li>
                  <li className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer" onClick={() => logout()}>
                    Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <ChangePassword isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} />
    </>
  );
}
