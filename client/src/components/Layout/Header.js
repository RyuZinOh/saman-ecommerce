import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { useAuth } from "../../context/auth";

const Header = () => {
  const { auth, setAuth } = useAuth();  // Correct destructuring
  const navigate = useNavigate();  // For navigation after logout

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth"); // Clear auth data from localStorage
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand ">
              <MdShoppingCart /> Saman Ecommerce
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link btn">
                      Logout
                    </button>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/cart" className="nav-link">
                      Cart (0) {/* Update this dynamically based on cart items */}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
