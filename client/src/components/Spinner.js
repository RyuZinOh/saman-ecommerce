import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (count === 0) {
      navigate("/login", {
        state: location.pathname,
      });
      return;
    }

    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="text-center">
        <h1 className="mb-4" style={{ fontSize: "2rem", fontWeight: "bold", color: "#495057" }}>
          Redirecting you in <strong>{count}</strong> {count === 1 ? "second" : "seconds"}...
        </h1>
        <div className="spinner-border" role="status" aria-live="polite" style={{ borderTopColor: "black" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
