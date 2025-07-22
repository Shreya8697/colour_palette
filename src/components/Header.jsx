import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo1 from "../assets/logo1.png";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              <img
                src={logo1}
                alt="Logo"
                className="h-20 w-20 mr-4 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/skin-tone-palette" label="Skin Tone" />
            <NavLink to="/hex-palette" label="HEX Creator" />
            <NavLink to="/code-compiler" label="Code Compiler" />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-90 px-4 pt-2 pb-4 shadow-sm backdrop-blur-sm">
          <MobileNavLink to="/skin-tone-palette" label="Skin Tone" />
          <MobileNavLink to="/hex-palette" label="HEX Creator" />
          <MobileNavLink to="/code-compiler" label="Code Compiler" />
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="
      relative px-3 py-2 text-lg font-medium text-gray-700 
      hover:text-blue-600 transition-colors duration-200
      after:content-[''] after:absolute after:bottom-0 after:left-1/2 
      after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all 
      after:duration-300 hover:after:w-full hover:after:left-0
    "
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-base text-gray-800 hover:text-blue-600 transition-colors duration-200"
  >
    {label}
  </Link>
);

export default Header;