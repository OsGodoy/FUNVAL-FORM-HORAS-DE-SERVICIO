import React, { useState } from "react";
import ServiceHourForm from "../components/ServiceHourForm";
import { MinusCircle, PlusCircle } from "lucide-react";
import ServicesListPage from "./ServicesListPage";

export default function ServiceHoursPage() {
  const [toggleRegisterService, setRegisterService] = useState(false);

  return (
    <div className="h-full p-2 flex gap-2 flex-col items-center justify-center">
      <button
        onClick={() => setRegisterService(!toggleRegisterService)}
        className={`group rounded-full gap-2 flex items-center justify-center self-start hover:cursor-pointer p-2 transition-all duration-300 hover:pr-6
          ${toggleRegisterService ? "bg-gray-500" : "bg-blue-500"}
          `}
      >
        <PlusCircle
          className={`text-white
          ${toggleRegisterService ? "hidden" : "block"}
          `}
        />
        <MinusCircle
          className={`text-white
          ${toggleRegisterService ? "block" : "hidden"}
          `}
        />
        <p className="text-white text-base hidden group-hover:inline-block">
          {toggleRegisterService ? "Volver" : "Registrar horas de servicio"}
        </p>
      </button>
      <section className={` ${toggleRegisterService ? "block" : "hidden"}`}>
        <ServiceHourForm />
      </section>
      <section
        className={`absolute top-10 duration-300 ${
          toggleRegisterService ? "hidden" : "block"
        }`}
      >
        <div className="p-4 h-150 w-full">
          <ServicesListPage />
        </div>
      </section>
    </div>
  );
}
