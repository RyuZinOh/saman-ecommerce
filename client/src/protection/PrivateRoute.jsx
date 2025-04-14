import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../manager/contexts/auth/useAuth";
import verifyToken from "../apis/authentication/authCheck/user-Auth";

const PrivateRoute = ({ children }) => {
  const { token, logout } = useAuth();
  const [ok, setOk] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyToken(token);
        setOk(res.ok);
      } catch (error) {
        console.error("Token verification failed:", error.message);
        setOk(false);
        logout();
      }
    };

    if (token) {
      checkToken();
    } else {
      setOk(false);
    }
  }, [token, logout]);

  if (ok === null) {
    return null;
  }

  return ok ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
