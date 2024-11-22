import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const { categories } = useCategory();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-light">
        <div className="container-fluid">
          <button
            className={`navbar-toggler ${isOpen ? "open" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarTogglerDemo01"
          >
            <Link to="/" className="navbar-brand text-white">
              Saman
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-white">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle text-white"
                  id="categoriesDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="categoriesDropdown"
                >
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/category/${category.slug}`}
                        className="dropdown-item"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link text-white">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link text-white">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle text-white"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Badge count={cart?.length} showZero>
                      <NavLink to="/cart" className="nav-link text-white">
                        Cart
                      </NavLink>
                    </Badge>
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
