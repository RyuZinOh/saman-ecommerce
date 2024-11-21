import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const { auth } = useAuth();
  return (
    <Layout
      title={`Your Orders - ${auth?.user?.name}`}
      description="View and manage all your orders in the Ecommerce App. Track order status, details, and history."
      author="Safal Lama"
      keywords="User orders, view orders, order history, order management, ecommerce orders"
    >
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
