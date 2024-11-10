import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [loading, setLoading] = useState(true);

  // default axios configuration
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    }
    setLoading(false); 
  }, []); 

  // Set Axios Authorization header after data is available
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = auth.token;
    }
  }, [auth.token]);

  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
