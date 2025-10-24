import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { getFunval, postFunval } from "../api/funval/services";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceHourForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toggleInfo, setToggleInfo] = useState(false);
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const response = await getFunval("/categories");
      setCategories(response.data || []);
    } catch (error) {
      toast.error("Error al cargar las categorías");
    }
  };

  const handleCategoryInfo = (category) => {
    setSelectedCategory(category);
    setToggleInfo(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setFileName(f ? f.name : "Ningún archivo seleccionado");
    if (f && f.type === "application/pdf") {
      const url = URL.createObjectURL(f);
      setPdfUrl(url);
    } else {
      setPdfUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !selectedCategory || !file) {
      toast.error("Completa todos los campos");
      return;
    }

    const formData = new FormData();
    formData.append("amount_reported", amount);
    formData.append("description", description);
    formData.append("category_id", selectedCategory.id);
    formData.append("evidence", file);

    try {
      setLoading(true);
      await postFunval("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Horas registradas correctamente");
      setAmount("");
      setDescription("");
      setFile(null);
      setFileName("Ningún archivo seleccionado");
      setPdfUrl(null);
      setSelectedCategory(null);
    } catch (error) {
      const message = error.response?.data?.message || "Error desconocido";
      toast.error(`Error al registrar las horas. ${message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <motion.section
        className="w-70 sm:w-140 md:w-165 lg:w-235 p-4 rounded-lg gap-4 flex flex-col lg:flex-row items-center justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full lg:w-[50%] flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-blue-500 text-lg lg:text-base font-bold text-center leading-6">
            Completa los requerimientos para registrar tus horas de servicio:
          </h1>

          <form
            onSubmit={handleSubmit}
            className="pt-3 w-full flex items-center justify-center"
          >
            <div className="w-full gap-4 flex flex-col items-center justify-center">
              <div className="w-full gap-3 flex flex-col sm:flex-row items-start justify-center">
                <motion.section
                  className="w-full p-2 rounded-lg border-2 border-blue-500 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-blue-500 font-medium text-2xl w-full sm:h-15 outline-none placeholder:font-normal text-center placeholder:text-gray-400 placeholder:text-base"
                    placeholder="Cantidad de horas a registrar"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </motion.section>

                <motion.section
                  className="w-full flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <label
                    htmlFor="file_input"
                    className="w-full sm:h-15 lg:h-19.5 p-3 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center justify-center hover:bg-blue-600 transition"
                  >
                    Seleccionar archivo en .pdf
                  </label>
                  <input
                    id="file_input"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <p
                    className={`text-xs mt-1 lg:hidden ${
                      fileName !== "Ningún archivo seleccionado"
                        ? "text-blue-500"
                        : "text-rose-400"
                    }`}
                  >
                    {fileName}
                  </p>
                </motion.section>
              </div>

              <motion.section
                className="w-full p-4 rounded-lg border-2 border-blue-500 gap-2 flex flex-col md:flex-row items-center justify-center md:relative md:h-85"
                layout
              >
                <motion.div
                  layout
                  className={`flex flex-col items-center justify-center md:absolute duration-300 ${
                    toggleInfo
                      ? "md:-translate-x-40 lg:-translate-x-32"
                      : "md:translate-0"
                  }`}
                >
                  <p className="text-blue-500 font-semibold mb-2">
                    Tipo de servicio
                  </p>
                  <ul className="grid grid-cols-1 gap-y-3">
                    {categories.slice(0, 6).map((category) => (
                      <motion.li
                        key={category.id}
                        onClick={() => handleCategoryInfo(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className={`border-2 rounded-full px-3 py-1.5 text-center leading-4.5 cursor-pointer duration-200 ${
                          selectedCategory?.id === category.id
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-blue-100 text-blue-500 border-blue-500"
                        } ${toggleInfo ? "lg:truncate lg:w-40" : "lg:w-auto"}`}
                      >
                        {category.name}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

               
                <AnimatePresence>
                  {toggleInfo && (
                    <motion.section
                      key="infoModal"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-blue-950/80 md:bg-blue-950/0 h-full md:h-72 w-full md:w-75 lg:w-60 absolute inset-0 rounded-lg p-4 md:p-0 md:top-6 md:left-76 lg:left-46 flex items-center justify-center"
                    >
                      <div className="w-full sm:w-100 h-80 md:h-full bg-white rounded-lg p-4 text-base flex flex-col items-center justify-center relative shadow-lg">
                        <h3 className="text-center text-blue-500 font-medium">
                          {selectedCategory?.name}:
                        </h3>
                        <p className="text-gray-500 text-center">
                          {selectedCategory?.description}
                        </p>
                        <Info className="text-gray-400 absolute top-4 right-4" />
                        <div className="w-full absolute bottom-4 px-4 gap-8 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setToggleInfo(false);
                              setSelectedCategory(null);
                            }}
                            className="p-2 text-sm text-white bg-gray-400 rounded-lg"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => setToggleInfo(false)}
                            type="button"
                            className="p-2 text-sm text-white bg-blue-500 rounded-lg"
                          >
                            Seleccionar
                          </button>
                        </div>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.section>

              {/* Descripción */}
              <motion.div
                className="border-2 border-gray-400 w-full rounded-lg py-2 px-3 text-sm hidden sm:flex items-center justify-center"
                whileFocus={{ scale: 1.01 }}
              >
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-20 w-full outline-none"
                  placeholder="Ingrese una descripción del servicio..."
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full p-2 text-white bg-blue-500 rounded-lg cursor-pointer shadow-md"
              >
                Registrar
              </motion.button>
            </div>
          </form>
        </motion.div>

        
        <motion.section
          className="hidden w-[50%] h-full border-2 border-blue-500 rounded-lg lg:flex items-center justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <input
            type="file"
            accept="application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          {!pdfUrl && (
            <motion.div
              className="h-[95%] w-[95%] border-2 border-gray-400 border-dashed absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
          <div className="h-160 w-full flex flex-col items-center justify-center">
            <p
              className={`mt-1 font-bold ${
                fileName !== "Ningún archivo seleccionado"
                  ? "text-blue-500"
                  : "text-rose-300"
              }`}
            >
              {fileName}
            </p>
            <AnimatePresence>
              {pdfUrl && (
                <motion.iframe
                  key="pdfPreview"
                  src={pdfUrl}
                  title="Vista previa del PDF"
                  className="w-[90%] h-[90%] rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </motion.section>

      <AnimatePresence>
        {loading && (
          <motion.section
            key="loader"
            className="bg-white/60 backdrop-blur-sm flex items-center justify-center absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-gray-700 rounded-lg text-2xl p-4 flex flex-col items-center justify-center gap-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <span className="animate-spin border-3 border-blue-600 border-t-transparent rounded-full size-8"></span>
              Enviando el registro...
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
