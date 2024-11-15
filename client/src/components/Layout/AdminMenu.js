import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="fixed-admin-menu">
      <div className="card shadow-lg rounded-lg border-0">
        <div className="card-body">
          <h4 className="card-title text-center text-dark mb-4">Admin Panel</h4>
          <div className="list-group list-group-flush">
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item custom-button d-flex align-items-center"
            >
              <span>Create Category</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item custom-button d-flex align-items-center"
            >
              <span>Create Product</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin/products"
              className="list-group-item custom-button d-flex align-items-center"
            >
              <span>Products</span>
            </NavLink>
            <NavLink
              to="/dashboard/admin/users"
              className="list-group-item custom-button d-flex align-items-center"
            >
              <span>Users</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
