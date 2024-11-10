import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout
      title="Dashboard - Create Product - My Website"
      description="Create a new product in the admin dashboard. Add product details such as name, price, description, and more."
      author="My Website Team"
      keywords="Create product, product management, admin dashboard, add product, product details"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
