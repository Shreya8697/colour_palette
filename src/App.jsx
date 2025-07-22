import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SkinColorInput from './components/SkinColorInput';
import HexPaletteCreator from './components/HexPaletteCreator';
import CodeCompiler from './components/CodeCompiler';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
};

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              DesignDev Toolkit
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/skin-tone-palette" label="Skin Tone" />
            <NavLink to="/hex-palette" label="HEX Creator" />
            <NavLink to="/code-compiler" label="Code Compiler" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600">
    {label}
  </Link>
);

const MainContent = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/skin-tone-palette" element={<SkinColorInput />} />
        <Route path="/hex-palette" element={<HexPaletteCreator />} />
        <Route path="/code-compiler" element={<CodeCompiler />} />
      </Routes>
    </main>
  );
};

const Footer = () => {
  // return (
  //   <footer className="bg-white border-t">
  //     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
  //       <p className="text-center text-gray-500 text-sm">
  //         &copy; {new Date().getFullYear()} DesignDev Toolkit. All rights reserved.
  //       </p>
  //     </div>
  //   </footer>
  // );
};

export default App;