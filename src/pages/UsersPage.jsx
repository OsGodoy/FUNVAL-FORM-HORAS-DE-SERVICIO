import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataTable from "../components/shared/DataTable";
import { getFunval, deleteFunval } from "../api/funval/services";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import { Pencil, PlusCircle, Trash2, UserCheck, UserX } from "lucide-react";

<<<<<<< HEAD
=======

>>>>>>> 561792f59dedf3018015770f956f3431209b24b3
export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [idUserToDelete, setIdUserToDelete] = useState(null);

  const getUsers = async () => {
    try {
      const response = await getFunval("/users");
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error al cargar los usuarios");
    }
  };
  const handleEdit = (id) => {
    navigate(`/users/${id}`);
  };

  const handleCreateNew = (id) => {
    navigate(`/users/new`);
  };

  const handleDeleteConfirm = (id) => {
    setIdUserToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (idUserToDelete) {
      await handleDelete();
      setConfirmDialogOpen(false);
      setIdUserToDelete(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFunval(`/users/${idUserToDelete}`);
      toast.success("Usuario eliminado correctamente");
      await getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error al eliminar el usuario");
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setIdUserToDelete(null);
  }; 
  useEffect(() => {
    getUsers();
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
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreateNew}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Agregar Usuario
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
            { key: "full_name", label: "Nombre Completo" },
            { key: "role.name", label: "Rol" },
            { key: "email", label: "Correo" },
            { key: "phone", label: "Teléfono" },
            { key: "status",
              aling: "center",
               label: "Estado",
                render: (row) => (
                 row.status === 'activo' ? <UserCheck color="green" /> : <UserX color="gray" />
              ), 
            },
            {
              key: "actions",
              aling: "center",
              label: "Acciones",
              render: (row) => (
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(row.id)}
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
          data={users}
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
    </div>
  );
}
