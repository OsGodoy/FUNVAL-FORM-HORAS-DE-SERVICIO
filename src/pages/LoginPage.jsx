import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postFunval } from "../api/funval/services.js";
import { useAuth } from "../contexts/Auth-context.jsx";
import toast from "react-hot-toast";

export default function LoginPage() {
  const images = [
    "/images/carousel/carousel1.jpg",
    "/images/carousel/carousel2.jpg",
    "/images/carousel/carousel4.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, authenticating } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => navigate("/home"), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Por favor ingrese sus credenciales");
      return;
    }

    try {
      const result = await login({ email, password });

      if (result) {
        if (remember) localStorage.setItem("rememberedEmail", email);
        else localStorage.removeItem("rememberedEmail");
        navigate("/home");
      } else {
        setErrorMsg("Credenciales incorrectas");
        toast.error("Credenciales incorrectas");
      }
    } catch (err) {
      setErrorMsg("Error al iniciar sesión.");
      toast.error("Error al iniciar sesión.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated || authenticating) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <div className="w-14 h-14 border-[6px] border-[#C1DFF7] border-t-[#37A5F2] rounded-full animate-spin"></div>
        <p className="text-lg font-semibold tracking-wide ">
          Validando datos...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#e3e8ef] to-[#f8fafc] px-4">
      <div className="bg-white flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl min-h-[600px]">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-12 py-16">
          <div className="w-full max-w-md">
            <Link to={"/"}>
              <img
                src="/images/funval-logo.svg"
                alt="Funval Logo"
                className="mb-8 w-40 "
              />
            </Link>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full"
              />
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`p-3 rounded-xl border ${
                    errorMsg ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full`}
                />
                {errorMsg && (
                  <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                )}
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-blue-500"
                />
                Recuerdame
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 active:scale-95 transition-transform duration-200 cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Carousel */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-gray-100">
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

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Dots */}
          <div className="absolute bottom-6 flex gap-2 justify-center w-full">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? "bg-white w-6" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
