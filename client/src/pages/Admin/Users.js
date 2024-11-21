import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout
      title="Dashboard - All Users - Saman"
      description="Manage and view all users in the admin dashboard. Access user data and perform actions on user accounts."
      author="safal lama"
      keywords="Admin dashboard, users, user management, view users, manage accounts"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
