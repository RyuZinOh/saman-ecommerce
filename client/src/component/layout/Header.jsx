import { useState } from "react";
import {
  ShoppingCart,
  MagnifyingGlass,
  User,
  List,
  X,
  PhoneCall,
} from "@phosphor-icons/react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../manager/contexts/auth/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);
  const { user, isAuthenticated, logout } = useAuth();

  // Predefined navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Notification bar content
  const notificationBar = {
    phone: "+977 9814202188",
    promotion: "noEvent currently!",
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Top Notification Bar - Normal scroll */}
      <div className="bg-indigo-800 text-white text-sm">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PhoneCall size={14} weight="bold" />
            <span>{notificationBar.phone}</span>
          </div>
          <div className="font-medium">{notificationBar.promotion}</div>
        </div>
      </div>

      {/* Main Header - Sticky */}
      <header className="bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                Saman
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium ${
                      isActive
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-700 hover:text-indigo-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-indigo-600">
                <MagnifyingGlass size={20} weight="bold" />
              </button>
              <button className="p-2 text-gray-700 hover:text-indigo-600 relative">
                <ShoppingCart size={20} weight="bold" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* User Account Section */}
              <div className="hidden lg:flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <Link
                        to="/account"
                        className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                      >
                        <User size={20} weight="bold" />
                        <span className="text-sm">
                          {user?.name || user?.email.split("@")[0]}
                        </span>
                      </Link>
                    </div>
                    <button
                      onClick={logout}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-3 py-1 text-gray-700 hover:text-indigo-600 text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="p-2 text-gray-700 hover:text-indigo-600 lg:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X size={20} weight="bold" />
                ) : (
                  <List size={20} weight="bold" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t mt-3">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `font-medium py-2 ${
                        isActive
                          ? "text-indigo-600 font-semibold"
                          : "text-gray-700 hover:text-indigo-600"
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* Mobile Auth Links */}
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/account"
                      className="mt-2 px-4 py-2 text-gray-700 hover:text-indigo-600 border rounded text-center"
                      onClick={toggleMenu}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="mt-4 px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 text-center"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center"
                      onClick={toggleMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
