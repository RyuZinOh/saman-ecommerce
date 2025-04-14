import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./manager/contexts/auth/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <App />
      <ToastContainer position="top-center" autoClose={5000} />
    </AuthProvider>
  </>
);
