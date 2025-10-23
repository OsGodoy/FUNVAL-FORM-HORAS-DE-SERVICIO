import axios from "axios";
import config from "./config.js";

const client = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Sesión expirada o token inválido");
        window.location.pathname = "/login";
      } else if (error.response.status >= 500) {
        console.error("Error en el servidor:", error.response.statusText);
      }
    } else {
      console.error("Error de conexión o timeout");
    }
    return Promise.reject(error);
  }
);

export default client;
