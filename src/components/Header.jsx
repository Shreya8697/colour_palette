import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";

const Header = () => {
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
                className="h-30 w-28 mr-5 object-contain"
              />

              {/* <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Colour Palette
        </span> */}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink  to="/skin-tone-palette" label="Skin Tone" />
            <NavLink to="/hex-palette" label="HEX Creator" />
            <NavLink to="/code-compiler" label="Code Compiler" />
          </nav>

          {/* Mobile menu button would go here */}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="
      relative px-3 py-2 text-sm font-medium text-gray-700 
      hover:text-blue-600 transition-colors duration-200
      after:content-[''] after:absolute after:bottom-0 after:left-1/2 
      after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all 
      after:duration-300 hover:after:w-full hover:after:left-0
    "
  >
    {label}
  </Link>
);

export default Header;
