import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { putFunval } from "../../api/funval/services";
import { useAuth } from "../../contexts/Auth-context";

export default function ChangePassword({ isOpen, onClose }) {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await putFunval("/auth/change-password", {
        old_password: currentPassword,
        new_password: newPassword,
      });
      toast.success("Contraseña actualizada correctamente");
      setTimeout(onClose, 1000);
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error al actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 w-[450px] relative border border-gray-100"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Botón cerrar */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
              <X size={22} />
            </button>

            {/* Título */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Configuración de perfil</h2>

            {/* 🧾 Información del usuario */}
            <div className="mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="text-gray-700 font-medium mb-3">Información personal</h3>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex flex-col">
                  <label className="text-gray-500 mb-1">Nombre</label>
                  <input
                    type="text"
                    readOnly
                    value={`${user?.f_name || ""} ${user?.m_name || ""}`}
                    className="bg-white border border-gray-300 rounded-lg p-2 text-gray-700 cursor-not-allowed focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500 mb-1">Apellidos</label>
                  <input
                    type="text"
                    readOnly
                    value={`${user?.f_lastname || ""} ${user?.s_lastname || ""}`}
                    className="bg-white border border-gray-300 rounded-lg p-2 text-gray-700 cursor-not-allowed focus:outline-none"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="text-gray-500 mb-1">Correo electrónico</label>
                  <input
                    type="text"
                    readOnly
                    value={user?.email || ""}
                    className="bg-white border border-gray-300 rounded-lg p-2 text-gray-700 cursor-not-allowed focus:outline-none"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="text-gray-500 mb-1">Escuela</label>
                  <input
                    type="text"
                    readOnly
                    value={user?.schools?.[0]?.name || "—"}
                    className="bg-white border border-gray-300 rounded-lg p-2 text-gray-700 cursor-not-allowed focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 🔐 Sección cambiar contraseña */}
            <h3 className="text-gray-700 font-medium mb-3">Cambiar contraseña</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>

            <Toaster position="top-right" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
