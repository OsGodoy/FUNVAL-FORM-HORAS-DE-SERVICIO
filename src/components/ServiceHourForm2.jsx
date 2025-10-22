import { Info, Play } from "lucide-react";
import React, { useState } from "react";

export default function ServiceHourForm2() {
  const [toggleInfo, setToggleInfo] = useState(false);
  const [serviceSelected, setServiceSelected] = useState(
    "Selecciona el tipo de servicio"
  );

  const [fileName, setFileName] = useState("Ningún archivo seleccionado");

  const handleServiceChange = (e) => {
    setServiceSelected(e.target.textContent);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Ningún archivo seleccionado");
  };

  return (
    <>
      <div className="w-full gap-3 flex flex-col sm:flex-row items-start justify-center">
        <div className="w-full p-2 rounded-lg border-2 border-blue-500 flex items-center justify-center">
          <input
            className="text-gray-600 font-medium w-full sm:px-7 sm:h-20 outline-none placeholder:font-normal placeholder:text-center sm:text-center"
            placeholder="Cantidad de horas a registrar"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <label
            htmlFor="file_input"
            className="w-full sm:h-20 p-2 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center justify-center"
          >
            Seleccionar archivo en .pdf
          </label>

          <input
            id="file_input"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <p
            className={`text-xs mt-1
            ${
              fileName !== "Ningún archivo seleccionado"
                ? "text-blue-500"
                : "text-rose-400"
            }
            `}
          >
            {fileName}
          </p>
        </div>
      </div>
      <div className="w-full p-4 rounded-lg border-2 border-blue-500 gap-2 flex flex-col items-center justify-center">
        <p className="text-blue-500 font-semibold">Tipo de servicio</p>
        <ul className="grid grid-cols-1 gap-y-3">
          <li
            onClick={() => setToggleInfo(true)}
            className="text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-full px-3 py-1.5 text-center leading-4.5 flex items-center justify-center hover:cursor-pointer"
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
      <div className="border-2 border-gray-400 w-full rounded-lg py-2 px-3 text-sm hidden sm:flex items-center justify-center">
        <textarea className="w-full outline-none" name="" id="" placeholder="Ingrese una descripción del servicio..."></textarea>
      </div>
      <button className="w-full p-2 text-white bg-blue-500 rounded-lg cursor-pointer">
        Registrar
      </button>
      <section
        className={`bg-blue-950/80 h-full w-full absolute inset-0 rounded-lg p-4 flex items-center justify-center duration-500
        ${
          toggleInfo
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        `}
      >
        <div className="w-full sm:w-100 h-80 bg-white rounded-lg p-4 flex flex-col items-center justify-center relative">
          <h3 className="text-center text-blue-500 font-medium">
            Templo e Historia familiar, Indexacion:
          </h3>
          <p className="text-gray-500 text-center">
            "Indexacion de nombre en family search"
          </p>
          <Info className="text-gray-400 absolute top-4 right-4" />
          <div className="w-full">
            <button
              type="button"
              className="p-2 text-sm text-white bg-blue-500 rounded-lg absolute bottom-4 right-4"
            >
              Seleccionar
            </button>
            <button
              type="button"
              onClick={() => setToggleInfo(false)}
              className="p-2 text-sm text-white bg-gray-400 rounded-lg absolute bottom-4 left-4"
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
