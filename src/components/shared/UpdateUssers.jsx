import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { putFunval } from "../../api/funval/services";
import { useAuth } from "../../contexts/Auth-context";

export default function UpdateUssers({ isOpen, onClose }) {
  const { user, fetchUserProfile } = useAuth();

  const [f_name, setFName] = useState("");
  const [m_name, setSName] = useState("");
  const [f_lastname, setFLastName] = useState("");
  const [s_lastname, setSLastName] = useState("");
  const [loading, setLoading] = useState(false);

  // Llenar datos del usuario cuando abra el modal
  useEffect(() => {
    if (user) {
      setFName(user.f_name || "");
      setSName(user.m_name || "");
      setFLastName(user.f_lastname || "");
      setSLastName(user.s_lastname || "");
    }
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const body = {
        f_name: f_name.trim(),
        m_name: m_name.trim(),
        f_lastname: f_lastname.trim(),
        s_lastname: s_lastname.trim(),
      };

      await putFunval(`/users/${user.id}`, body);
      toast.success("Perfil actualizado correctamente");
      await fetchUserProfile();
      setTimeout(onClose, 1000);
    } catch (error) {
      console.error("Error al actualizar perfil:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error al actualizar el perfil");
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
            className="bg-white rounded-2xl shadow-2xl p-8 w-[500px] relative border border-gray-100"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 text-center">Configuración de perfil</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-gray-500 mb-1">Primer nombre</label>
                  <input
                    type="text"
                    value={f_name}
                    onChange={(e) => setFName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500 mb-1">Segundo nombre</label>
                  <input
                    type="text"
                    value={m_name}
                    onChange={(e) => setSName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500 mb-1">Primer apellido</label>
                  <input
                    type="text"
                    value={f_lastname}
                    onChange={(e) => setFLastName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500 mb-1">Segundo apellido</label>
                  <input
                    type="text"
                    value={s_lastname}
                    onChange={(e) => setSLastName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* Solo mostrar correo y escuela */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex flex-col col-span-1">
                  <label className="text-gray-500 mb-1">Correo electrónico</label>
                  <input
                    type="text"
                    readOnly
                    value={user?.email || ""}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className="text-gray-500 mb-1">Escuela</label>
                  <input
                    type="text"
                    readOnly
                    value={user?.schools?.[0]?.name || "—"}
                    className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
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
