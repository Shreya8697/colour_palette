import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SkinColorInput from './components/SkinColorInput';
import HexPaletteCreator from './components/HexPaletteCreator';
import CodeCompiler from './components/CodeCompiler';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/skin-tone-palette" element={<SkinColorInput />} />
            <Route path="/hex-palette" element={<HexPaletteCreator />} />
            <Route path="/code-compiler" element={<CodeCompiler />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;