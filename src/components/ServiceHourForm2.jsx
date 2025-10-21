import { Play } from "lucide-react";
import React, { useState } from "react";

export default function ServiceHourForm2() {
  const [toggleSchool, setToggleSchool] = useState(false);
  const [schoolSelected, setSchoolSelected] = useState("Selecciona tu escuela");
  const [toggleServiceType, setToggleServiceType] = useState(false);
  const [serviceSelected, setServiceSelected] = useState(
    "Selecciona el tipo de servicio"
  );
  const [toggleCourseLevel, setToggleCourseLevel] = useState(false);
  const [courseLevelSelected, setCourseLevelSelected] = useState(
    "Selecciona el nivel cursado"
  );
  const [fileName, setFileName] = useState("Ningún archivo seleccionado");

  const handleSchoolChange = (e) => {
    setSchoolSelected(e.target.textContent);
  };

  const handleServiceChange = (e) => {
    setServiceSelected(e.target.textContent);
  };

  const handleLevelChange = (e) => {
    setCourseLevelSelected(e.target.textContent);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "Ningún archivo seleccionado");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Nivel del curso</p>
        <div className="border border-gray-400 w-full h-9.5 px-3 flex items-center justify-center relative hover:cursor-pointer">
          <div
            className={`w-full h-52 gap-2.5 bg-white p-4 pr-9 rounded-b-md border border-gray-400 flex flex-col items-start justify-start absolute top-0 z-20 origin-top duration-500
                ${toggleCourseLevel ? "scale-y-100" : "scale-y-0"}
                `}
          >
            <ul className="w-full h-full text-blue-500 font-medium text-sm flex flex-col items-start justify-between">
              <li
                onClick={(e) => (
                  handleLevelChange(e), setToggleCourseLevel(false)
                )}
                className="p-1 min-w-40 flex items-center justify-start hover:bg-gray-100 hover:cursor-pointer"
              >
                Nivel 1
              </li>
            </ul>
          </div>
          <div
            onClick={() => {
              setToggleCourseLevel(!toggleCourseLevel),
                setToggleSchool(false),
                setToggleServiceType(false);
            }}
            className="w-full flex items-center justify-between"
          >
            <p
              className={`text-sm
              ${
                courseLevelSelected !== "Selecciona el nivel cursado"
                  ? "text-gray-700"
                  : "text-gray-400"
              }
              `}
            >
              {courseLevelSelected}
            </p>
            <Play
              className={`text-gray-400 fill-gray-400 size-4.5 p-1 rotate-90 duration-500 z-50
              ${toggleCourseLevel && "rotate-270"}
              `}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Escuela que estas cursando</p>
        <div className="border border-gray-400 w-full h-9.5 px-3 flex items-center justify-center relative hover:cursor-pointer">
          <div
            className={`w-full h-52 gap-2.5 bg-white p-4 pr-9 rounded-b-md border border-gray-400 flex flex-col items-start justify-start absolute top-0 z-10 origin-top duration-500
                ${toggleSchool ? "scale-y-100" : "scale-y-0"}
                `}
          >
            <ul className="w-full h-full text-blue-500 font-medium text-sm flex flex-col items-start justify-between">
              <li
                onClick={(e) => (handleSchoolChange(e), setToggleSchool(false))}
                className="p-1 min-w-40 flex items-center justify-start hover:bg-gray-100 hover:cursor-pointer"
              >
                Escuela 1
              </li>
            </ul>
          </div>
          <div
            onClick={() => {
              setToggleSchool(!toggleSchool), setToggleServiceType(false);
            }}
            className="w-full flex items-center justify-between"
          >
            <p
              className={`text-sm
              ${
                schoolSelected !== "Selecciona tu escuela"
                  ? "text-gray-700"
                  : "text-gray-400"
              }
              `}
            >
              {schoolSelected}
            </p>
            <Play
              className={`text-gray-400 fill-gray-400 size-4.5 p-1 rotate-90 duration-500 z-10
              ${toggleSchool && "rotate-270"}
              `}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Tipo de servicio</p>
        <div className="border border-gray-400 w-full h-9.5 px-3 flex items-center justify-center relative hover:cursor-pointer">
          <div
            className={`w-full h-52 gap-2.5 bg-white p-4 pr-9 rounded-b-md border border-gray-400 flex flex-col items-start justify-start absolute top-0 z-0 origin-top duration-500
                ${toggleServiceType ? "scale-y-100" : "scale-y-0"}
                `}
          >
            <ul className="w-full h-full text-blue-500 font-medium text-sm flex flex-col items-start justify-between">
              <li
                onClick={(e) => (
                  handleServiceChange(e), setToggleServiceType(false)
                )}
                className="p-1 min-w-40 flex items-center justify-start hover:bg-gray-100 hover:cursor-pointer"
              >
                Tipo de Servicio 1
              </li>
            </ul>
          </div>
          <div
            onClick={() => {
              setToggleServiceType(!toggleServiceType), setToggleSchool(false);
            }}
            className="w-full flex items-center justify-between"
          >
            <p
              className={`text-sm
              ${
                serviceSelected !== "Selecciona el tipo de servicio"
                  ? "text-gray-700"
                  : "text-gray-400"
              }
              `}
            >
              {serviceSelected}
            </p>
            <Play
              className={`text-gray-400 fill-gray-400 size-4.5 p-1 rotate-90 duration-500 z-0
              ${toggleServiceType && "rotate-270"}
              `}
            />
          </div>
        </div>
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
          className="mt-0.5 w-60 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer flex items-center justify-center"
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
                ? "text-blue-500"
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
