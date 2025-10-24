import { useEffect, useState } from "react";
import { getFunval, patchFunval } from "../api/funval/services";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import DataTable from "../components/shared/DataTable";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Loader2 } from "lucide-react";
import { statusStyles } from "../utils/utils";
import { useAuth } from "../contexts/Auth-context";

export default function ServicesListPage() {
  const navigate = useNavigate();
  const { user: userSession } = useAuth();

  const [serviList, setServiList] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const [approvedHours, setApprovedHours] = useState("0");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("Approved");
  const [loading, setLoading] = useState(false);


  const getServices = async () => {
    try {
      const response = await getFunval("/services");
      setServiList(response.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error al cargar los servicios");
    }
  };


  const getEvidence = async (id_evidence, serviceId, isReview) => {
    setLoading(true);
    setIsReviewMode(isReview);
    try {
      const response = await getFunval(`/evidence/${id_evidence}`, {
        responseType: "blob",
      });

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfUrl(pdfUrl);
      setSelectedServiceId(serviceId);
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage = `Detalle: ${error.response?.data?.message || error.message}`;
      console.error("Error fetching evidence:", error);
      toast.error(`Error al cargar la evidencia. ${errorMessage}`);
      setSelectedServiceId(serviceId);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };


  const closeModal = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    setIsModalOpen(false);
    setSelectedServiceId(null);
    setApprovedHours("");
    setComment("");
    setStatus("Approved");
  };


  const handleReview = async () => {
    if (!approvedHours || !status) {
      toast.error("Debes ingresar las horas aprobadas y seleccionar un estado");
      return;
    }

    if (Number(approvedHours) < 0) {
      toast.error("Debes ingresar un numero entero válido de horas aprobadas");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount_approved: Number(approvedHours),
        comment,
        status,
      };

      await patchFunval(`/review/${selectedServiceId}`, payload);
      toast.success("Revisión enviada correctamente");
      closeModal();
      getServices();
    } catch (error) {
      console.error("Error al enviar revisión:", error);
      toast.error("Error al enviar la revisión");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const handleCreateNew = () => navigate(`/service-hours/new`);

  useEffect(() => {
    getServices();
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (e.target.value === '2') setApprovedHours("0");
  }

  const handleApprovedHoursChange = (e) => {
    setApprovedHours(e.target.value);
    if (Number(e.target.value) > 0) setStatus("1");
  }

  const columsHeaders = userSession.role?.name === 'Admin' ?
    [
      { key: "id", label: "#" },
      { key: "user.full_name", label: "Usuario" },
      { key: "category.name", label: "Servicio" },
      { key: "amount_reported", label: "Horas reportadas" },
      {
        key: "status",
        label: "Estado",
        render: (row) => {
          const style = statusStyles[row.status || "Pending"] || {};
          return (
            <span
              className={`px-2 py-1 rounded-lg font-semibold text-sm ${style.bg} ${style.color}`}
            >
              {style.label || row.status}
            </span>
          );
        },
      },
      { key: "amount_approved", label: "Horas aprobadas" },
      { key: "comment", label: "Comentarios" },
      {
        key: "evidence",
        label: "Evidencia",
        render: (row) =>
          row.evidence ? (
            <button
              onClick={() => getEvidence(row.evidence, row.id, row.status === 'Pending')}
              className={`cursor-pointer ${row.status === 'Pending' ? 'text-orange-500 hover:text-orange-700' : 'text-blue-600 hover:text-blue-800'} font-semibold underline`}
            >
              {row.status === 'Pending' && userSession.role?.name === 'Admin' ? 'Revisar' : 'Ver PDF'}
            </button>
          ) : (
            <span className="text-gray-400 italic">Sin evidencia</span>
          ),
      },
      {
        key: "created_at",
        label: "Fecha creación",
        render: (row) => formatDate(row.created_at),
      },
      {
        key: "updated_at",
        label: "Fecha actualización",
        render: (row) => formatDate(row.updated_at),
      },
    ]
    :
    [
      { key: "id", label: "#" },
      { key: "user.full_name", label: "Usuario" },
      { key: "category.name", label: "Servicio" },
      { key: "amount_reported", label: "Horas reportadas" },
      {
        key: "status",
        label: "Estado",
        render: (row) => {
          const style = statusStyles[row.status || "Pending"] || {};
          return (
            <span
              className={`px-2 py-1 rounded-lg font-semibold text-sm ${style.bg} ${style.color}`}
            >
              {style.label || row.status}
            </span>
          );
        },
      },
      {
        key: "evidence",
        label: "Evidencia",
        render: (row) =>
          row.evidence ? (
            <button
              onClick={() => getEvidence(row.evidence, row.id, row.status === 'Pending')}
              className={`cursor-pointer ${row.status === 'Pending' ? 'text-orange-500 hover:text-orange-700' : 'text-blue-600 hover:text-blue-800'} font-semibold underline`}
            >
              {row.status === 'Pending' && userSession.role?.name === 'Admin' ? 'Revisar' : 'Ver PDF'}
            </button>
          ) : (
            <span className="text-gray-400 italic">Sin evidencia</span>
          ),
      },
      { key: "amount_approved", label: "Horas aprobadas" },
      { key: "comment", label: "Comentarios" }
    ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <Toaster position="top-right" />

      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">{userSession.role?.name === 'Admin' ? 'Lista de horas de servicio' : 'Mis horas de servicio'}</h1>

        {userSession.role?.name === 'Student' && <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreateNew}
          className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          Nuevo registro
        </motion.button>}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          headers={columsHeaders}
          data={serviList}
          pageSize={10}
        />
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 shadow-lg p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={closeModal}
                className="cursor-pointer absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              >
                ×
              </button>

              <h2 className="text-2xl font-semibold mb-4 text-center">
                Revisión de Evidencia
              </h2>

              {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                  <Loader2 className="animate-spin text-blue-600" size={40} />
                </div>
              ) : (
                <div className="flex gap-2">
                  {pdfUrl ? (
                    <iframe
                      src={pdfUrl}
                      title="Evidencia PDF"
                      className={` ${isReviewMode && userSession.role?.name === 'Admin' ? 'w-[60%]' : ' w-full'} h-[50vh] border rounded-lg mb-4`}
                    />
                  )
                    : (
                      <div className={` ${isReviewMode && userSession.role?.name === 'Admin' ? 'w-[60%]' : 'w-full'} flex justify-center items-center h-[50vh] border border-gray-300 rounded-lg mb-4`}>
                        <span className="text-gray-500 italic">No hay evidencia disponible</span>
                      </div>
                    )}

                  {isReviewMode && userSession.role?.name === 'Admin' && (
                    <div className="flex flex-col gap-4 w-[40%] ">
                      <input
                        type="number"
                        min="0"
                        value={approvedHours}
                        onChange={handleApprovedHoursChange}
                        placeholder="Horas aprobadas"
                        className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                      />

                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comentarios"
                        className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        rows="6"
                      />

                      <select
                        value={status}
                        onChange={handleStatusChange}
                        className="border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                      >
                        <option value="1">Aprobado</option>
                        <option value="2">Rechazado</option>
                      </select>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReview}
                        disabled={loading}
                        className="cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" size={20} /> Enviando...
                          </>
                        ) : (
                          "Enviar revisión"
                        )}
                      </motion.button>
                    </div>

                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {loading && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-500" size={48} />
          <p className="text-gray-700 mt-4 text-lg font-semibold">
            Cargando...
          </p>
        </div>
      )}
    </div>
  );
}
