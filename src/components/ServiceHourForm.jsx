import React, { useState } from "react";
import ServiceHourForm1 from "./ServiceHourForm1";
import ServiceHourForm2 from "./ServiceHourForm2";

export default function ServiceHourForm() {
  const [toggleNext, setToggleNext] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-blue-500 flex items-center justify-center">
        <section className="bg-white w-70 p-4 rounded-lg flex flex-col items-center justify-between">
          <img
            className="w-40 mb-6 mt-2"
            src="/images/funval-logo.svg"
            alt=""
          />
          <h1 className="mb-3 text-gray-700">
            Formulario de horas de servicio -{" "}
            <span
              className={`${
                toggleNext
                  ? "text-gray-400 font-normal"
                  : "text-blue-600 font-semibold"
              } `}
            >
              1
            </span>
            /
            <span
              className={`${
                toggleNext
                  ? "text-blue-600 font-semibold"
                  : "text-gray-400 font-normal"
              } `}
            >
              2
            </span>
          </h1>
          <form
            className="text-gray-500 pt-4 w-full h-120 flex items-center justify-center"
            action=""
          >
            <div className="w-full h-full gap-4 flex flex-col items-center justify-start">
              {toggleNext ? <ServiceHourForm2 /> : <ServiceHourForm1 />}
            </div>
          </form>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={() => setToggleNext(!toggleNext)}
              className={`w-24 border border-gray-400 rounded-full gap-1 flex items-center justify-between transition-all duration-400
                ${toggleNext ? "pr-3.5" : "pl-2"}
                `}
            >
              <p
                className={`text-sm text-gray-400
                ${toggleNext ? "order-2" : "order-1"}
                `}
              >
                {toggleNext ? "anterior" : "siguiente"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`size-8 text-gray-500
                  ${toggleNext ? "order-1 rotate-y-180" : "order-2"}
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
      </div>
    </>
  );
}
