import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-between">
        <header className="fixed w-full lg:w-250 xl:w-295 p-5 sm:p-8 flex items-center justify-center">
          <div className="w-full flex items-center justify-between">
            <img
              className="w-35 md:w-40"
              src="/images/funval-logo.svg"
              alt=""
            />
            <Link to={"/login"}>
              <button className="bg-blue-950 text-white md:text-lg p-2 px-4 rounded-sm drop-shadow-md drop-shadow-black/40 hover:cursor-pointer hover:scale-104 duration-200">
                Acceder
              </button>
            </Link>
          </div>
        </header>
        <section className="w-full px-6 grow flex items-start justify-center bg-[url(/images/bg-image.png)] sm:bg-left bg-flip-x bg-top bg-cover md:bg-[url(/images/bg-image-lg.png)] md:bg-[position:36%_80%] 2xl:md:bg-[position:0%_0%]">
          <div className="h-110 sm:h-130 lg:h-150 xl:h-160 w-80 sm:w-125 md:w-155 lg:w-190 flex items-center justify-end">
            <h2 className="text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl text-end leading-8 sm:leading-10 md:leading-12 lg:leading-15 bg-gradient-to-bl from-rose-500 via-indigo-700 to-sky-600 bg-clip-text text-transparent">
              Si estudiar abre <br /> puertas <br />
              <span className="font-semibold sm:font-medium">
                Nosotros te <br /> damos la <br />
                llave.
              </span>
            </h2>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
