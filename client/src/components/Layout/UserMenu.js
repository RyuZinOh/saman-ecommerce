import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="container py-4">
      <div className="card shadow-lg rounded">
        <div className="card-body text-center">
          <h4 className="card-title mb-4">User Panel</h4>
          <div className="list-group">
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item list-group-item-action py-3 px-4 rounded mb-2 text-dark hover-effect"
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/user/orders"
              className="list-group-item list-group-item-action py-3 px-4 rounded mb-2 text-dark hover-effect"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
