import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataTable from "../components/shared/DataTable";
import { getFunval } from "../api/funval/services";
import toast, { Toaster } from "react-hot-toast";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const response = await getFunval("/roles");
      setRoles(response.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Error al cargar los roles");
    }
  };

  useEffect(() => {
    getRoles();
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
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Roles</h1>

        
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
          ]}
          data={roles}
          pageSize={5}
        />
      </motion.div>
    </div>
  );
}
