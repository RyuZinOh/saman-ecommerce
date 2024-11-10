import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

const Profile = () => {
  return (
    <Layout
      title="Your Profile - Ecommerce App"
      description="View and update your personal profile details in the Ecommerce App. Manage your account settings and preferences."
      author="Ecommerce App Team"
      keywords="User profile, account settings, manage profile, personal information, ecommerce profile"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
