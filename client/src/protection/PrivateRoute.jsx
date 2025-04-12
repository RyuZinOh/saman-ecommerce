import { useState, useEffect } from "react";
import { useAuth } from "../manager/contexts/auth/useAuth";
import { useNavigate, Outlet } from "react-router-dom";
import Layout from "../component/layout/Layout";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        navigate("/login", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (isLoading && !isAuthenticated) {
    return (
      <Layout title="Access Denied" description="Authentication required">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Authentication Required
            </h2>
            <p className="text-gray-600 mt-2">Redirecting to login...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout title="Loading..." description="Verifying your authentication">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Layout>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
