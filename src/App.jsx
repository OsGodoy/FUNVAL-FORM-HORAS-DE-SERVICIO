import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./contexts/Auth-context";
import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./contexts/Auth-context";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#39b98e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e53e3e",
              secondary: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  );
}