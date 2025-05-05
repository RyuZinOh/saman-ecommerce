import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./manager/contexts/auth/AuthProvider.jsx";
import SearchProvider from "./manager/contexts/auth/search/SearchProvider.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
      <ToastContainer position="top-center" autoClose={5000} />
    </AuthProvider>
  </>
);
