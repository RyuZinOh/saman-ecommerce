import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout
      title="Dashboard - Create Category - My Website"
      description="Create and manage product categories in the admin dashboard. Add new categories to organize products effectively."
      author="My Website Team"
      keywords="Create category, product categories, admin dashboard, manage categories, add category"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Category</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
