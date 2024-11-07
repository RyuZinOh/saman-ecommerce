import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/auth"; // Ensure correct import

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const { setAuth } = useAuth(); // Access setAuth from useAuth hook

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        formData
      );

      if (data.success) {
        toast.success(data.message, { duration: 4000 });

        // Save the user data and token to the global auth state
        setAuth({
          user: data.user, // Assuming the response has user data
          token: data.token, // Assuming the response has a token
        });
        localStorage.setItem("auth", JSON.stringify(data)); // Fix typo here

        // Navigate to home or another protected page
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout
      title="Login - My Website"
      description="Log in to access your account on My Website."
      author="My Website Team"
      keywords="login, user account"
    >
      <div className="login d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <h1 className="text-center mb-4">Login</h1>
              <form
                onSubmit={handleSubmit}
                className="p-4 shadow-lg"
                style={{
                  backgroundColor: "white",
                  borderRadius: "15px",
                  boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label d-flex align-items-center"
                  >
                    <FaEnvelope className="me-2 text-dark" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label d-flex align-items-center"
                  >
                    <FaLock className="me-2 text-dark" />
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100 mt-3 shadow"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "8px",
                    transition: "background-color 0.3s, color 0.3s",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "black";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "black";
                  }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
