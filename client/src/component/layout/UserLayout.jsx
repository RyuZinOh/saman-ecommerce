import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DotsThree, X, User, Folder, House } from "@phosphor-icons/react";
import Layout from "./Layout";

const UserLayout = ({ ...props }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <House size={20} />,
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: <User size={20} />,
    },
    {
      path: "/dashboard/orders",
      label: "Orders",
      icon: <Folder size={20} />,
    },
  ];

  return (
    <Layout {...props}>
      <Helmet>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="User dashboard for managing account and orders"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between bg-blue-700 text-white p-4">
          <h2 className="text-xl font-bold">My Account</h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <DotsThree size={24} />}
          </button>
        </div>

        {/* Sidebar - Mobile & Desktop */}
        <div
          className={`
          ${isMobileMenuOpen ? "block" : "hidden"} 
          md:block w-full md:w-64 bg-blue-700 text-white 
          flex-shrink-0 transition-all duration-300 ease-in-out
        `}
        >
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-8 mt-2 hidden md:block">
              My Account
            </h2>
            <nav className="flex-1">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => isMobile && setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 block px-4 py-3 rounded transition ${
                        location.pathname === item.path
                          ? "bg-blue-800 font-medium"
                          : "hover:bg-blue-600"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto p-2 text-blue-200 text-xs md:text-sm">
              <p>v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto bg-white">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserLayout;
