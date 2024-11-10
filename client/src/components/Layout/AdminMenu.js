import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded">
        <div className="card-body text-center">
          <h4 className="card-title mb-4">Admin Panel</h4>
          <div className="list-group">
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item list-group-item-action py-3 px-4 rounded mb-2 hover-shadow"
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action py-3 px-4 rounded mb-2 hover-shadow"
            >
              Create Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/users"
              className="list-group-item list-group-item-action py-3 px-4 rounded mb-2 hover-shadow"
            >
              Users
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
