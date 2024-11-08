import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that provides context value to its children
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    }
    //eslint-disable
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
