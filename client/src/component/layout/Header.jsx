import { useState, useRef, useEffect, memo } from "react";
import {
  ShoppingCart,
  MagnifyingGlass,
  User,
  List,
  X,
  PhoneCall,
  CaretDown,
} from "@phosphor-icons/react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../manager/contexts/auth/useAuth";

// Constants
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NOTIFICATION_BAR = {
  phone: "+977 9814202188",
  promotion: "noEvent currently!",
};

// Separate components of upnav
const NotificationBar = memo(() => (
  <div className="bg-indigo-800 text-white text-sm">
    <div className="container mx-auto px-4 py-1 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <PhoneCall size={14} weight="bold" />
        <span>{NOTIFICATION_BAR.phone}</span>
      </div>
      <div className="font-medium">{NOTIFICATION_BAR.promotion}</div>
    </div>
  </div>
));

const UserDropdown = memo(
  ({ isOpen, toggleDropdown, user, logout, dropdownRef }) => {
    const handleDashboardClick = (e) => {
      e.stopPropagation();
      if (user && user.role === 1) {
        // Admin Redirect
        window.location.href = "/admin-dashboard";
      } else {
        // Regular User Redirect
        window.location.href = "/dashboard";
      }
      toggleDropdown();
    };

    return (
      <div className="hidden lg:block relative" ref={dropdownRef}>
        {user ? (
          <div className="flex items-center">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <User size={20} weight="bold" />
              <span className="text-sm">
                {user.name || user.email.split("@")[0]}
              </span>
              <CaretDown
                size={16}
                weight="bold"
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute mt-35 w-40 bg-white rounded-md  py-1 z-50 border border-gray-200 transition-all duration-200 ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-1 pointer-events-none"
              }`}
            >
              <button
                onClick={handleDashboardClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  logout();
                  toggleDropdown();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              to="/login"
              className="px-3 py-1 text-gray-700 hover:text-indigo-600 text-sm transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    );
  }
);

const MobileMenu = memo(
  ({ isOpen, toggleMenu, navLinks, isAuthenticated, logout }) => {
    if (!isOpen) return null;

    return (
      <nav className="lg:hidden py-4 border-t mt-3">
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium py-2 transition-colors ${
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

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="mt-2 px-4 py-2 text-gray-700 hover:text-indigo-600 border rounded text-center transition-colors"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-center transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="mt-4 px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 text-center transition-colors"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center transition-colors"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  }
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [cartItems] = useState(3);
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleUserDropdown = () => setIsUserDropdownOpen((prev) => !prev);

  return (
    <>
      <NotificationBar />

      <header className="bg-white sticky top-0 z-50 ">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Saman
            </Link>

            <nav className="hidden lg:flex space-x-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors ${
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

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-indigo-600 transition-colors">
                <MagnifyingGlass size={20} weight="bold" />
              </button>
              <button className="p-2 text-gray-700 hover:text-indigo-600 relative transition-colors">
                <ShoppingCart size={20} weight="bold" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>

              <UserDropdown
                isOpen={isUserDropdownOpen}
                toggleDropdown={toggleUserDropdown}
                user={isAuthenticated ? user : null}
                logout={logout}
                dropdownRef={dropdownRef}
              />

              <button
                className="p-2 text-gray-700 hover:text-indigo-600 lg:hidden transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={20} weight="bold" />
                ) : (
                  <List size={20} weight="bold" />
                )}
              </button>
            </div>
          </div>

          <MobileMenu
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            navLinks={NAV_LINKS}
            isAuthenticated={isAuthenticated}
            logout={logout}
          />
        </div>
      </header>
    </>
  );
};

export default memo(Header);
