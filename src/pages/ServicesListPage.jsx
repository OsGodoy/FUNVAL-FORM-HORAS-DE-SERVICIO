import React, { useEffect, useState } from "react";
import { getFunval } from "../api/funval/services";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import DataTable from "../components/shared/DataTable";

export default function ServicesListPage() {
  const [serviList, setServiList] = useState([]);

  const getServices = async () => {
    try {
      const response = await getFunval("/services");
      setServiList(response.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Error al cargar los roles");
    }
  };

  useEffect(() => {
    getServices();
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
        <h1 className="text-3xl font-bold text-gray-800">
          Mis horas de servicio
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          headers={[
            { key: "id", label: "#" },
            { key: "user.full_name", label: "Usuario" },
            { key: "category.name", label: "Servicio" },
            { key: "amount_reported", label: "Horas reportadas" },
            { key: "amount_approved", label: "Horas aprobadas" },
          ]}
          data={serviList}
          pageSize={5}
        />
      </motion.div>
    </div>
  );
}
