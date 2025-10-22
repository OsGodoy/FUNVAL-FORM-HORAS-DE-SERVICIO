import { Globe, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react'
import { useAuth } from '../../contexts/Auth-context'

export default function Footer() {
  const { user, logout } = useAuth()
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* --- Columna 1: Contacto --- */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contáctanos</h3>
          <div className="flex justify-center md:justify-start gap-3 mb-4">
            <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded">
              <Globe className="w-5 h-5" />
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded">
              <Phone className="w-5 h-5" />
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 p-2 rounded">
              <Mail className="w-5 h-5" />
            </button>
          </div>

          <h3 className="font-semibold text-lg mb-2">Síganos</h3>
          <div className="flex justify-center md:justify-start gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full">
              <Facebook className="w-5 h-5 fill-white " />
            </button>
            <button className="bg-red-600 hover:bg-red-700 p-2 rounded-full">
              <Youtube className="w-5 h-5" />
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full">
              <Instagram className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- Columna 2: Centro / Usuario --- */}
        <div className="flex flex-col items-center md:items-center justify-center">
          <button className="border border-gray-400 hover:bg-gray-800 rounded-md px-4 py-2 mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>Contactar con el soporte del sitio</span>
          </button>

          <p className="text-sm flex flex-col text-gray-300">
            <span className="flex gap-1">
              <span>Usted se ha identificado como</span>
              <span className="font-semibold text-white">{`${user.name} ${user.lastname}`}</span>
            </span>

            <span
              className="text-sm mt-1 text-blue-400 cursor-pointer hover:underline"
              onClick={() => logout()}
            >
              (Cerrar sesión)
            </span>
          </p>

          <ul className="text-sm mt-3 space-y-1 text-gray-300">
            <li>Resumen de retención de datos</li>
            <li>Descargar la app para dispositivos móviles</li>
            <li>Reiniciar tour para usuario en esta página</li>
          </ul>
        </div>

        {/* --- Columna 3: Apps móviles --- */}
        <div className="flex flex-col items-center md:items-end justify-center">
          <p className="mb-3 font-medium">
            Descargar la app para dispositivos móviles
          </p>
          <img
            src="https://freelogopng.com/images/all_img/1664287128google-play-store-logo-png.png"
            alt="Google Play"
            className="w-40 mb-2 cursor-pointer border-1 border-white rounded-xl"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="w-40 cursor-pointer"
          />
        </div>
      </div>
    </footer>
  )
}
