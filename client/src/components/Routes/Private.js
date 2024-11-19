import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!auth?.token) throw new Error("No token provided");

        // Decode and validate token
        const decoded = jwtDecode(auth.token);
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        // Perform server-side check
        const res = await axios.get(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5000"
          }/api/v1/auth/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setOk(res.data?.ok || false);
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
        setOk(false);
      }
    };

    authCheck();
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner />;
}
