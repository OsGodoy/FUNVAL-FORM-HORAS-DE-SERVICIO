import React, { useState } from "react";
import ServiceHourForm1 from "./ServiceHourForm1";
import ServiceHourForm2 from "./ServiceHourForm2";

export default function ServiceHourForm() {
  const [toggleNext, setToggleNext] = useState(false);

  return (
    <section className="w-70 sm:w-140 p-4 rounded-lg flex flex-col items-center justify-center relative">
      <h1 className="text-blue-500 text-lg font-bold text-center leading-6">
        Completa los requerimientos para registrar tus horas de servicio
      </h1>
      <form className="pt-4 w-full flex items-center justify-center" action="">
        <div
          className={`w-full gap-4 flex flex-col items-center justify-center`}
        >
          <ServiceHourForm2 />
        </div>
      </form>
    </section>
  );
}
