import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/users`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.message || "Failed to fetch users.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchUsers();
  }, [auth?.token]);

  return (
    <Layout
      title="Dashboard - All Users - Saman"
      description="Manage and view all users in the admin dashboard. Access user data and perform actions on user accounts."
      author="Safal Lama"
      keywords="Admin dashboard, users, user management, view users, manage accounts"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="mb-4">All Users</h1>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : (
              <div className="table-responsive">
                {users.length === 0 ? (
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title">No Users Found</h5>
                      <p className="card-text">
                        There are currently no users to display.
                      </p>
                    </div>
                  </div>
                ) : (
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>
                            {typeof user.address === "string"
                              ? user.address
                              : JSON.stringify(user.address)}
                          </td>
                          <td>{user.role === 1 ? "Admin" : "User"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
