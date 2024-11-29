import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Imported eye icons
import { useAuth } from "../../context/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // New state for toggling password visibility
  const { email, password } = formData;

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

        setAuth({
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));

        navigate(location.state || "/");
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
      title="Login - Saman Ecommerce"
      description="Log in to access your account on My Website."
      author="safal lama"
      keywords="login, user account"
    >
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <form
                onSubmit={handleSubmit}
                className="p-4 shadow-lg rounded-3 bg-white border"
                style={{ minHeight: "400px" }} // Set form height to be taller
              >
                <h1 className="text-center mb-4">Login</h1>{" "}
                {/* Moved the heading inside the form */}
                {/* Email Input */}
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label d-flex align-items-center text-dark"
                  >
                    <FaEnvelope className="me-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                {/* Password Input */}
                <div className="mb-3 position-relative">
                  <label
                    htmlFor="password"
                    className="form-label d-flex align-items-center text-dark"
                  >
                    <FaLock className="me-2" />
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                    onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-dark" /> // Show the eye-slash icon when password is visible
                    ) : (
                      <FaEye className="text-dark" /> // Show the eye icon when password is hidden
                    )}
                  </button>
                </div>
                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-dark w-100 mt-3" // Set button color to black
                >
                  Login
                </button>
                {/* Forgot Password Link */}
                <div className="text-center mt-3">
                  <Link
                    to="/forget-password"
                    className="text-decoration-none text-primary"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
