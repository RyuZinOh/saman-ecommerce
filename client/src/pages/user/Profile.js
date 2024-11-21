import React, { useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState(auth?.user?.name || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(auth?.user?.phone || "");
  const [address, setAddress] = useState(auth?.user?.address || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/profile`,
        { name, email, password, phone, address },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data.updatedUser });
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data.updatedUser })
        );
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout
      title={`Your Profile - ${auth?.user?.name}`}
      description="View and update your personal profile details in the Ecommerce App. Manage your account settings and preferences."
      author="Safal Lama"
      keywords="User profile, account settings, manage profile, personal information, ecommerce profile"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <h4 className="title">USER PROFILE</h4>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Name"
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Email"
                  required
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="Enter Your Address"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                UPDATE PROFILE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
