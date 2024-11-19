import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminDat() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/auth/admin-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
            timeout: 5000,
          }
        );

        if (res.data?.ok) {
          setOk(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };

    if (auth?.token) authCheck();
    else navigate("/login");
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner />;
}
