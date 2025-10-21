import React, { useState } from "react";
import ServiceHourForm1 from "./ServiceHourForm1";
import ServiceHourForm2 from "./ServiceHourForm2";

export default function ServiceHourForm() {
  const [toggleNext, setToggleNext] = useState(false);

  return (
    <section className="bg-white w-70 sm:w-130 p-4 sm:p-8 rounded-lg flex flex-col items-center justify-between drop-shadow-lg drop-shadow-black/60">
          <img
            className="w-40 mb-6 mt-2"
            src="/images/funval-logo.svg"
            alt=""
          />
          <h1 className="mb-3 text-gray-700 font-bold">
            Formulario de horas de servicio -{" "}
            <span
              className={`${
                toggleNext
                  ? "text-gray-400 font-normal"
                  : "text-blue-500 font-semibold"
              } `}
            >
              1
            </span>
            <span className="text-gray-400">/</span>
            <span
              className={`${
                toggleNext
                  ? "text-blue-500 font-semibold"
                  : "text-gray-400 font-normal"
              } `}
            >
              2
            </span>
          </h1>
          <form
            className="text-gray-500 pt-4 w-full h-120 flex items-center justify-center relative"
            action=""
          >
            <div
              className={`w-full h-full gap-4 flex flex-col items-center justify-start absolute inset-0 duration-300
              ${
                toggleNext
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }  
              `}
            >
              <ServiceHourForm1 />
            </div>
            <div
              className={`w-full h-full gap-4 flex flex-col items-center justify-start absolute inset-0 duration-300
              ${
                toggleNext
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }
              `}
            >
              <ServiceHourForm2 />
            </div>
          </form>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => setToggleNext(!toggleNext)}
              className={`w-25 border border-gray-400 rounded-full gap-1 flex items-center justify-between hover:cursor-pointer
                ${toggleNext ? "pl-4" : "pl-2.5"}
                `}
            >
              <p className={`text-sm text-gray-400`}>
                {toggleNext ? "anterior" : "siguiente"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`size-8 text-gray-500 duration-500 
                  ${toggleNext && "rotate-y-180"}
                  `}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </section>
  );
}
