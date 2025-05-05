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
import SearchInput from "../SeachInput";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NotificationBar = () => (
  <div className="bg-indigo-800 text-white text-sm">
    <div className="container mx-auto px-4 py-1 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <PhoneCall size={14} weight="bold" />
        <span>+977 9814202188</span>
      </div>
      <span className="font-medium">noEvent currently!</span>
    </div>
  </div>
);

const MobileSearchModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-white z-50 p-4 lg:hidden">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">Search</h2>
      <button onClick={onClose} className="p-2">
        <X size={24} weight="bold" />
      </button>
    </div>
    <SearchInput variant="default" />
  </div>
);

const UserDropdown = ({ isOpen, toggleDropdown, user, logout }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        toggleDropdown(false);
      }
    },
    [toggleDropdown]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleDashboard = () => {
    navigate(user?.role === 1 ? "/admin-dashboard" : "/dashboard");
    toggleDropdown(false);
  };

  const handleLogout = () => {
    logout();
    toggleDropdown(false);
  };

  return (
    <div className="hidden lg:block relative" ref={dropdownRef}>
      {user ? (
        <div className="flex items-center">
          <button
            onClick={() => toggleDropdown(!isOpen)}
            className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
          >
            <User size={20} weight="bold" />
            <span className="text-sm">
              {user.name || user.email.split("@")[0]}
            </span>
            <CaretDown
              size={16}
              weight="bold"
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`absolute right-0 mt-2 w-40 bg-white rounded border transition-all z-50 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={handleDashboard}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Link
            to="/login"
            className="text-sm text-gray-700 hover:text-indigo-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

const MobileMenu = ({ isOpen, toggleMenu, isAuthenticated, logout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <nav className="lg:hidden border-t mt-3 py-4">
      <div className="flex flex-col space-y-3">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={toggleMenu}
            className={({ isActive }) =>
              `text-base py-2 ${
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }`
            }
            end
          >
            {link.name}
          </NavLink>
        ))}
        {isAuthenticated ? (
          <>
            <button
              onClick={() => {
                navigate("/dashboard");
                toggleMenu();
              }}
              className="btn-outline"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="btn-ghost"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={toggleMenu} className="btn-outline">
              Login
            </Link>
            <Link to="/register" onClick={toggleMenu} className="btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleUserDropdown = useCallback(
    (force) =>
      setIsUserDropdownOpen((prev) =>
        typeof force === "boolean" ? force : !prev
      ),
    []
  );

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, []);

  return (
    <>
      <NotificationBar />
      <header className="bg-white sticky top-0 z-50 ">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            SAMAN
          </Link>

          <nav className="hidden lg:flex space-x-8">
            {NAV_LINKS.map(({ name, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-700 hover:text-indigo-600"
                  }`
                }
                end
              >
                {name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden lg:block">
              <SearchInput variant="navbar" />
            </div>

            {/* Mobile Search */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="lg:hidden text-gray-700 hover:text-indigo-600 p-2"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>

            {/* Cart */}
            <button className="relative p-2 text-gray-700 hover:text-indigo-600">
              <ShoppingCart size={20} />
              {isAuthenticated && (
                <span className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-indigo-600 text-white rounded-full">
                  3
                </span>
              )}
            </button>

            {/* User dropdown */}
            <UserDropdown
              isOpen={isUserDropdownOpen}
              toggleDropdown={toggleUserDropdown}
              user={isAuthenticated ? user : null}
              logout={logout}
            />

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? (
                <X size={20} weight="bold" />
              ) : (
                <List size={20} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />
      </header>

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <MobileSearchModal onClose={() => setShowMobileSearch(false)} />
      )}
    </>
  );
};

export default memo(Header);
