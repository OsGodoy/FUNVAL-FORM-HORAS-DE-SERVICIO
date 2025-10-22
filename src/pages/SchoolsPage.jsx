import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import DataTable from "../components/shared/DataTable";
import { getFunval, postFunval, putFunval, deleteFunval } from "../api/funval/services";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDialog from "../components/shared/ConfirmDialog";

export default function SchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [idCategoryToDelete, setIdCategoryToDelete] = useState(null); 

  const getSchools = async () => {
    try {
      const response = await getFunval("/schools");
      setSchools(response.data || []);
    } catch (error) {
      console.error("Error fetching schools:", error);
      toast.error("Error al cargar las escuelas");
    }
  };

  const handleEdit = (school) => {
    setSelectedCategory(school);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteFunval(`/schools/${idCategoryToDelete}`);
      toast.success("Escuela eliminada correctamente");
      await getSchools();
    } catch (error) {
      console.error("Error deleting school:", error);
      toast.error("Error al eliminar la escuela");
    }
  };

 
  const handleDeleteConfirm = (id) => {
    setIdCategoryToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (idCategoryToDelete) {
      await handleDelete();
      setConfirmDialogOpen(false);
      setIdCategoryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setIdCategoryToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();

    if (!name) {
      toast.error("El nombre es obligatorio");
      return;
    }

    try {
      if (selectedCategory) {
        await putFunval(`/schools/${selectedCategory.id}`, { name });
        toast.success("Escuela actualizada correctamente");
      } else {
        await postFunval("/schools", { name });
        toast.success("Escuela creada con éxito");
      }

      await getSchools();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving school:", error);
      toast.error("Error al guardar la escuela");
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <Toaster position="top-right" />

      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Escuelas</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreate}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Agregar Escuela
        </motion.button>
      </motion.div>

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
              aling: "center",
              render: (row) => (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(row)}
                    className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirm(row.id)}
                    className="text-red-600 hover:text-red-800 transition cursor-pointer"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ),
            },
          ]}
          data={schools}
          pageSize={5}
        />
      </motion.div>


      <ConfirmDialog
        title="¿Estás seguro?"
        description="Esta acción no se puede deshacer."
        isOpen={isConfirmDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

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
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl p-6 w-96"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {selectedCategory ? "Editar Escuela" : "Crear Nueva Escuela"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  name="name"
                  placeholder="Nombre"
                  defaultValue={selectedCategory?.name || ""}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {selectedCategory ? "Modificar" : "Guardar"}
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
