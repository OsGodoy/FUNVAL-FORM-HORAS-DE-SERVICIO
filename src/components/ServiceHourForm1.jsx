import React from "react";

export default function ServiceHourForm1() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Correo electrónico</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">N° de matricula</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Nombre completo</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Controller asignado</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">País</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="self-start text-sm">Responsable</p>
        <input
          className="text-blue-500 font-medium border text-sm w-full border-gray-400 p-2 outline-none"
          type="text"
        />
      </div>
    </>
  );
}
