import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataTable from "../components/shared/DataTable";
import { getFunval } from "../api/funval/services";
import toast, { Toaster } from "react-hot-toast";
import { UserCheck, UserX } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await getFunval("/students");
      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Error al cargar los estudiantes");
    }
  };

  useEffect(() => {
    getStudents();
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
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Estudiantes</h1>


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
            { key: "email", label: "Correo" },
            { key: "phone", label: "Teléfono" },
            {
              key: "status",
              aling: "center",
              label: "Estado",
              render: (row) => (
                row.status === 'activo' ?
                  <div className="relative group inline-block">
                    <UserCheck color="green" />
                    <span className="absolute w-15 text-center -top-6 left-1/2 -translate-x-1/2 bg-gray-800/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200">
                      Activo
                    </span>
                  </div>
                  : 
                  <div className="relative group inline-block">
                    <UserX color="gray" />
                    <span className="absolute w-15 text-center -top-6 left-1/2 -translate-x-1/2 bg-gray-800/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200">
                      Inactivo
                    </span>
                  </div>
              ),
            },
          ]}
          data={students}
          pageSize={10}
        />
      </motion.div>
    </div>
  );
}
