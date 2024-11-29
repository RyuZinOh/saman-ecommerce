import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { FaEnvelope, FaQuestion } from "react-icons/fa";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    fpassA: "",
    newPassword: "",
  });
  const { email, fpassA, newPassword } = formData;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !fpassA || !newPassword) {
      return toast.error("Please fill in all fields");
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/forget_password`,
        formData
      );

      if (data.success) {
        toast.success("Password reset successful. Please log in.");
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
      title="Forgot Password - Saman"
      description="Reset your password for My Website."
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
                <h1 className="text-center mb-4">Forgot Password</h1>{" "}
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
                {/* Security Answer Input */}
                <div className="mb-3">
                  <label
                    htmlFor="fpassA"
                    className="form-label d-flex align-items-center text-dark"
                  >
                    <FaQuestion className="me-2" />
                    Security Answer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fpassA"
                    value={fpassA}
                    onChange={handleChange}
                    placeholder="Who is your favorite waifu in anime?"
                  />
                </div>
                {/* New Password Input */}
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label text-dark">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                    placeholder="Enter your new password"
                  />
                </div>
                {/* Reset Password Button */}
                <button
                  type="submit"
                  className="btn btn-dark w-100 mt-3" // Set button color to black
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;
