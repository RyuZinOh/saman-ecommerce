import { useState, useRef, useEffect, memo, useCallback } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  MagnifyingGlass,
  User,
  List,
  X,
  PhoneCall,
  CaretDown,
} from "@phosphor-icons/react";
import { useAuth } from "../../manager/contexts/auth/useAuth";

// Constants
const NAV_LINKS = Object.freeze([
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]);

const NOTIFICATION_BAR = Object.freeze({
  phone: "+977 9814202188",
  promotion: "noEvent currently!",
});

// Memoized Components
const NotificationBar = memo(() => (
  <div className="bg-indigo-800 text-white text-sm">
    <div className="container mx-auto px-4 py-1 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <PhoneCall size={14} weight="bold" aria-hidden="true" />
        <span>{NOTIFICATION_BAR.phone}</span>
      </div>
      <div className="font-medium">{NOTIFICATION_BAR.promotion}</div>
    </div>
  </div>
));

const UserDropdown = memo(({ isOpen, toggleDropdown, user, logout }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleDashboardClick = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(user?.role === 1 ? "/admin-dashboard" : "/dashboard");
      toggleDropdown();
    },
    [navigate, user?.role, toggleDropdown]
  );

  const handleLogoutClick = useCallback(
    (e) => {
      e.stopPropagation();
      logout();
      toggleDropdown();
    },
    [logout, toggleDropdown]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleDropdown]);

  return (
    <div className="hidden lg:block relative" ref={dropdownRef}>
      {user ? (
        <div className="flex items-center">
          <button
            onClick={() => toggleDropdown(!isOpen)}
            className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <User size={20} weight="bold" aria-hidden="true" />
            <span className="text-sm">
              {user.name || user.email.split("@")[0]}
            </span>
            <CaretDown
              size={16}
              weight="bold"
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            className={`absolute mt-38 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 transition-all duration-200 ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none"
            }`}
            role="menu"
          >
            <button
              onClick={handleDashboardClick}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              role="menuitem"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogoutClick}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              role="menuitem"
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
});

const MobileMenu = memo(({ isOpen, toggleMenu, isAuthenticated, logout }) => {
  const navigate = useNavigate();

  const handleDashboardClick = useCallback(() => {
    navigate("/dashboard");
    toggleMenu();
  }, [navigate, toggleMenu]);

  const handleLogoutClick = useCallback(() => {
    logout();
    toggleMenu();
  }, [logout, toggleMenu]);

  if (!isOpen) return null;

  return (
    <nav className="lg:hidden py-4 border-t mt-3" aria-label="Mobile menu">
      <div className="flex flex-col space-y-3">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `font-medium py-2 transition-colors ${
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }`
            }
            onClick={toggleMenu}
            end
          >
            {link.name}
          </NavLink>
        ))}

        {isAuthenticated ? (
          <>
            <button
              onClick={handleDashboardClick}
              className="mt-2 px-4 py-2 text-gray-700 hover:text-indigo-600 border rounded text-center transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogoutClick}
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
});

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleUserDropdown = useCallback(
    () => setIsUserDropdownOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <NotificationBar />
      <header className="bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div
              className="text-2xl font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            >
              SAMAN
            </div>

            <nav
              className="hidden lg:flex space-x-8"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors px-1 py-2 ${
                      isActive
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-700 hover:text-indigo-600"
                    }`
                  }
                  end
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-gray-700 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label="Search"
              >
                <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
              </button>

              <button
                className="p-2 text-gray-700 hover:text-indigo-600 relative transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                aria-label="Cart"
              >
                <ShoppingCart size={20} weight="bold" aria-hidden="true" />
                {isAuthenticated && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                )}
              </button>

              <UserDropdown
                isOpen={isUserDropdownOpen}
                toggleDropdown={toggleUserDropdown}
                user={isAuthenticated ? user : null}
                logout={logout}
              />

              <button
                className="p-2 text-gray-700 hover:text-indigo-600 lg:hidden transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X size={20} weight="bold" aria-hidden="true" />
                ) : (
                  <List size={20} weight="bold" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <MobileMenu
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isAuthenticated={isAuthenticated}
            logout={logout}
          />
        </div>
      </header>
    </>
  );
};

export default memo(Header);
