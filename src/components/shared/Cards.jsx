/* URL'S IMAGES
instituto - https://www.estudiantefunval.org/pluginfile.php/91/course/overviewfiles/Instituto.png
fronted - https://www.estudiantefunval.org/pluginfile.php/88409/course/overviewfiles/FRONTEND%202.png
servicio - https://www.estudiantefunval.org/pluginfile.php/92/course/overviewfiles/requerimiento%20de%20nivel.png
valores - https://www.estudiantefunval.org/pluginfile.php/128/course/overviewfiles/Valores.png
*/

export default function Cards() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" cursor-pointer relative flex w-80 flex-col rounded-xl bg-linear-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://www.estudiantefunval.org/pluginfile.php/92/course/overviewfiles/requerimiento%20de%20nivel.png"
              alt="img-cards"
              className="h-60 object-center"
            />
          </div>
        </div>
        <div className="px-4 py-2">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300">
            Hora de Servicio
          </h5>
        </div>
        <div className="px-5 pb-5">
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
            <div style={{ width: "70%" }} className="bg-blue-600 h-2.5 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">70% Completado</span>
          </div>
        </div>
      </div>
    </section>
  );
}
