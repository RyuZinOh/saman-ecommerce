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
      title="Forgot Password - My Website"
      description="Reset your password for My Website."
    >
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <h1 className="text-center mb-4">Forgot Password</h1>
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
                  <label htmlFor="email" className="form-label">
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
                  <label htmlFor="fpassA" className="form-label">
                    <FaQuestion className="me-2 text-dark" />
                    Security Answer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fpassA"
                    value={fpassA}
                    onChange={handleChange}
                    placeholder="Who is your favorite waifu in anime?"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                    placeholder="Enter your new password"
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
