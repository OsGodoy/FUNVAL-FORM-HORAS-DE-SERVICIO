export default function Cards({ title, srcImage, progress }) {
  return (
    <div className="cursor-pointer relative flex flex-col w-full sm:w-72 md:w-80 my-2 rounded-xl bg-gradient-to-br from-white to-gray-50 text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={srcImage} alt="img-cards" className="w-full h-full object-center" />
        </div>
      </div>
      <div className="px-3 sm:px-4 py-2 sm:py-3">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h5>
      </div>
      <div className="px-5 pb-5">
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
          <div style={{ width: `${progress}%` }} className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"></div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{`${progress}% Completado`}</span>
        </div>
      </div>
    </div>
  );
}
