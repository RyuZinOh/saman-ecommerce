import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const { auth } = useAuth();

  return (
    <Layout
      title={`Dashboard - ${auth?.user?.name}`}
      description="User dashboard of the Ecommerce App. View personal details including name, email, and address."
      author="Safal Lama"
      keywords="Ecommerce dashboard, user profile, user details, account settings, personal information"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
