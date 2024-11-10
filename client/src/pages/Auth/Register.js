import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    fpassA: "",
  });
  const { name, email, password, phone, address, fpassA } = formData;

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

    if (!name || !email || !password || !phone || !address || !fpassA) {
      return toast.error(
        "Please fill in all fields, including the security answer."
      );
    }

    try {
      const dataToSend = { ...formData, role: "0" }; //default setting all other user except me as 0, me is 1 = admin
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
        dataToSend
      );

      if (data.success) {
        navigate("/login");
        toast.success(data.message, { duration: 4000 });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const iconMapping = {
    name: <FaUser className="me-2 text-dark" />,
    email: <FaEnvelope className="me-2 text-dark" />,
    password: <FaLock className="me-2 text-dark" />,
    phone: <FaPhone className="me-2 text-dark" />,
    address: <FaMapMarkerAlt className="me-2 text-dark" />,
    fpassA: <FaQuestionCircle className="me-2 text-dark" />,
  };

  return (
    <Layout
      title="Register - My Website"
      description="Sign up for an account on My Website to access exclusive features."
      author="My Website Team"
      keywords="register, sign up, user account"
    >
      <div className="register d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <h1 className="text-center mb-4">Registration</h1>
              <form
                onSubmit={handleSubmit}
                className="p-4 shadow-lg"
                style={{
                  backgroundColor: "white",
                  borderRadius: "15px",
                  boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.1)",
                }}
              >
                {[
                  "name",
                  "email",
                  "password",
                  "phone",
                  "address",
                  "fpassA",
                ].map((field) => (
                  <div className="mb-3" key={field}>
                    <label
                      htmlFor={field}
                      className="form-label d-flex align-items-center"
                    >
                      {iconMapping[field]}
                      {field === "fpassA"
                        ? "Who is your favorite waifu in anime?"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "password" ? "password" : "text"}
                      className="form-control"
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${
                        field === "fpassA" ? "answer to the question" : field
                      }`}
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                ))}
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
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
