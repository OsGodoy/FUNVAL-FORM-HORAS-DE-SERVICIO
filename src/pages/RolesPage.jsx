import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DataTable from "../components/shared/DataTable";
import { getFunval, postFunval } from "../api/funval/services";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const getRoles = async () => {
    try {
      const response = await getFunval("/roles");
      setRoles(response.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedRole(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;

    try {
      await postFunval("/roles", { name, description });
      await getRoles();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 🔹 Encabezado con título y botón */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Roles</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreate}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          + Agregar Rol
        </motion.button>
      </motion.div>

      {/* 🔹 Tabla de roles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          headers={[
            { key: "id", label: "#" },
            { key: "name", label: "Nombre" },
            {
              key: "actions",
              label: "Acciones",
              render: (row) => (
                <button
                  onClick={() => handleEdit(row)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
              ),
            },
          ]}
          data={roles}
          pageSize={5}
          title="Lista de Roles"
        />
      </motion.div>

      {/* 🔹 Modal para crear/editar */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            onClick={() => setShowForm(false)}
            className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {selectedRole ? "Editar Rol" : "Crear Nuevo Rol"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  name="name"
                  placeholder="Nombre"
                  defaultValue={selectedRole?.name || ""}
                  className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                  required
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
