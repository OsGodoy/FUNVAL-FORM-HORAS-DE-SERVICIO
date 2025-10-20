import { useState, useEffect } from "react";

export default function LoginPage() {
  const images = [
    "/images/carousel/carousel1.jpg",
    "/images/carousel/carousel2.jpg",
    "/images/carousel/carousel3.jpg",
    "/images/carousel/carousel4.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#e3e8ef] to-[#f8fafc] px-4">
      <div className="bg-white flex rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl min-h-[600px]">
        {/* Left Side: Form */}
        <div className="w-full sm:w-1/2 px-12 py-16 flex flex-col justify-center">
          <img src="images/funval-logo.svg" alt="" />

          <form className="flex flex-col gap-6 mt-10">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full"
            />
            <button
              type="submit"
              className="bg-[#155CFD] text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-transform duration-200"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Side: Carousel */}
        <div className="hidden md:flex w-1/2 relative items-center justify-center bg-gray-100">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`slide-${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Soft Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-6 flex gap-2 justify-center w-full">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? "bg-white w-6" : "bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
