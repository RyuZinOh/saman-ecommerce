import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../manager/contexts/auth/useAuth";
import verifyAdmin from "../apis/authentication/authCheck/admin-Auth";

const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const res = await verifyAdmin(token);
        setIsAdmin(res.ok);
      } catch (error) {
        console.error("Admin verification failed:", error.message);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [token]);

  if (isAdmin === null) {
    return <div className="text-center py-10">Loading...</div>; 
  }


  if (!isAdmin && user) {
    return <Navigate to="/dashboard" />;
  }

  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
