import React, { useState } from "react";
import ServiceHourForm1 from "./ServiceHourForm1";
import ServiceHourForm2 from "./ServiceHourForm2";
import { Info } from "lucide-react";

export default function ServiceHourForm() {
  const [toggleInfo, setToggleInfo] = useState(false);
  const [serviceSelected, setServiceSelected] = useState(
    "Selecciona el tipo de servicio"
  );
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleServiceChange = (e) => {
    setServiceSelected(e.target.textContent);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Ningún archivo seleccionado");
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      setPdfUrl(null);
    }
  };

  return (
    <section className="w-70 sm:w-140 md:w-165 lg:w-235 p-4 rounded-lg gap-4 flex flex-col lg:flex-row items-center justify-center relative">
      <div className="w-full lg:w-[50%] flex flex-col items-center justify-center">
        <h1 className="text-blue-500 text-lg lg:text-base font-bold text-center leading-6">
          Completa los requerimientos para registrar tus horas de servicio:
        </h1>
        <form
          className="pt-4 w-full flex items-center justify-center"
          action=""
        >
          <div
            className={`w-full gap-4 flex flex-col items-center justify-center`}
          >
            <div className="w-full gap-3 flex flex-col sm:flex-row items-start justify-center">
              <section className="w-full p-2 rounded-lg border-2 border-blue-500 flex items-center justify-center">
                <input
                  className="text-blue-500 font-medium text-2xl w-full sm:h-15 outline-none placeholder:font-normal text-center placeholder:text-gray-400 placeholder:text-base"
                  placeholder="Cantidad de horas a registrar"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </section>
              <section className="w-full flex flex-col items-center justify-center">
                <label
                  htmlFor="file_input"
                  className="w-full sm:h-15 lg:h-19.5 p-2 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center justify-center"
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
                  className={`text-xs mt-1 lg:hidden
                ${
                  fileName !== "Ningún archivo seleccionado"
                    ? "text-blue-500"
                    : "text-rose-400"
                }
              `}
                >
                  {fileName}
                </p>
              </section>
            </div>
            <section className="w-full p-4 rounded-lg border-2 border-blue-500 gap-2 flex flex-col md:flex-row items-center justify-center md:relative md:h-85">
              <div
                className={`flex flex-col items-center justify-center md:absolute duration-300
                  ${
                    toggleInfo
                      ? "md:-translate-x-40 lg:-translate-x-32"
                      : "md:translate-0"
                  }
              `}
              >
                <p className="text-blue-500 font-semibold mb-2">
                  Tipo de servicio
                </p>
                <ul className="grid grid-cols-1 gap-y-3">
                  <li
                    onClick={() => setToggleInfo(true)}
                    className={`text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-full px-3 py-1.5 text-center leading-4.5 hover:cursor-pointer
                      ${toggleInfo ? "lg:truncate lg:w-40" : "lg:w-auto"}
                      `}
                  >
                    Templo e Historia familiar, Indexacion
                  </li>

                  <li className="text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-full px-3 py-1.5 text-center leading-4.5 flex items-center justify-center hover:cursor-pointer">
                    Instructor
                  </li>
                  <li className="text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-full px-3 py-1.5 text-center leading-4.5 flex items-center justify-center hover:cursor-pointer">
                    Liderazgo
                  </li>
                  <li className="text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-full px-3 py-1.5 text-center leading-4.5 flex items-center justify-center hover:cursor-pointer">
                    Revision
                  </li>
                  <li className="text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-full px-3 py-1.5 text-center leading-4.5 flex items-center justify-center hover:cursor-pointer">
                    Asistencia al templo
                  </li>
                  <li className="text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-full px-3 py-1.5 text-center leading-4.5 flex items-center justify-center hover:cursor-pointer">
                    Templo
                  </li>
                </ul>
              </div>
              <section
                className={`bg-blue-950/80 md:bg-blue-950/0 h-full md:h-72 w-full md:w-75 lg:w-60 absolute inset-0 rounded-lg p-4 md:p-0 md:top-6 md:left-76 lg:left-46 flex items-center justify-center duration-300 
                  ${
                    toggleInfo
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }
                `}
              >
                <div className="w-full sm:w-100 h-80 md:h-full bg-white rounded-lg p-2 text-base flex flex-col items-center justify-center relative">
                  <div className="flex flex-col items-center justify-center mb-4">
                    <h3 className="text-center text-blue-500 font-medium">
                      Templo e Historia familiar, Indexacion:
                    </h3>
                    <p className="text-gray-500 text-center">
                      "Indexacion de nombre en family search"
                    </p>
                  </div>
                  <Info className="text-gray-400 absolute top-4 right-4" />
                  <div className="w-full absolute bottom-4 px-4 gap-8 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setToggleInfo(false)}
                      className="p-2 text-sm text-white bg-gray-400 rounded-lg"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="p-2 text-sm text-white bg-blue-500 rounded-lg"
                    >
                      Seleccionar
                    </button>
                  </div>
                </div>
              </section>
            </section>
            <div className="border-2 border-gray-400 w-full rounded-lg py-2 px-3 text-sm hidden sm:flex items-center justify-center">
              <textarea
                className="h-20 w-full outline-none"
                name=""
                id=""
                placeholder="Ingrese una descripción del servicio..."
              ></textarea>
            </div>
            <button className="w-full p-2 text-white bg-blue-500 rounded-lg cursor-pointer">
              Registrar
            </button>
          </div>
        </form>
      </div>
      <section className="hidden w-[50%] h-full border-2 border-blue-500 rounded-lg lg:flex items-center justify-center relative">
        <div
          className={`h-[95%] w-[95%] border-2 border-gray-400 border-dashed absolute
          ${pdfUrl ? "hidden" : "block"}
          `}
        ></div>
        <div className="h-160 w-full flex flex-col items-center justify-center">
          <p
            className={`mt-1 font-bold
                ${
                  fileName !== "Ningún archivo seleccionado"
                    ? "text-blue-500"
                    : "text-rose-300"
                }
              `}
          >
            {fileName}
          </p>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              title="Vista previa del PDF"
              className="w-[90%] h-[90%] rounded-lg"
            ></iframe>
          )}
        </div>
      </section>
    </section>
  );
}
