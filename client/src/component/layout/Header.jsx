import { useState } from "react";
import {
  ShoppingCart,
  MagnifyingGlass,
  User,
  List,
  X,
  PhoneCall,
} from "@phosphor-icons/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);

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
    promotion: "🎉 Excellent Cash on Delivery Event - Shop Now! 🎉",
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
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Saman</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  {link.name}
                </a>
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
              <button className="p-2 text-gray-700 hover:text-indigo-600">
                <User size={20} weight="bold" />
              </button>
              <button
                className="p-2 text-gray-700 hover:text-indigo-600 md-hidden"
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
            <nav className="md:hidden py-4 border-t mt-3">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
