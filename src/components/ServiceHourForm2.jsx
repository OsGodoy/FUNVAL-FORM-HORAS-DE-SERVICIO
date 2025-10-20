import React, { useState } from "react";

export default function ServiceHourForm2() {
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Ningún archivo seleccionado");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Nivel del curso</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Escuela que esté cursando</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="number"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Tipo de servicio</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Cantidad de horas a registrar</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="mt-6 w-full flex flex-col items-center justify-center">
        <p className="text-sm">Adjuntar evidencia en formato .pdf</p>
        <label
          htmlFor="file_input"
          className="mt-0.5 w-full px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center justify-center"
        >
          Seleccionar archivo
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
                ? "text-blue-400"
                : "text-rose-400"
            }
            `}
        >
          {fileName}
        </p>
      </div>
    </>
  );
}
