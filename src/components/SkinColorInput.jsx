import React, { useState, useEffect } from 'react';
import generatePalette from '../utils/generatePalette';
import PaletteDisplay from './PaletteDisplay';
import { FiCopy, FiInfo } from 'react-icons/fi';

const SkinColorInput = () => {
  const [skinColor, setSkinColor] = useState('#c68642');
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const initialPalette = generatePalette(skinColor);
    setPalette(initialPalette);
  }, []);

  const handleGenerate = () => {
    const newPalette = generatePalette(skinColor);
    setPalette(newPalette);
    setCopied(null);
  };

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      {/* Background with floating elements */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        {/* Floating color circles */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-60"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-32 right-1/3 w-24 h-24 bg-gradient-to-r from-amber-400 to-red-400 rounded-full opacity-40"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '0.5s' }}
        ></div>

        <div className="relative max-w-5xl mx-auto px-4 py-10">
          
          {/* Main content card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-rose-600/10 rounded-3xl shadow-xl"></div>
            <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Skin Tone Palette Generator</h2>
                  <p className="text-gray-600 max-w-md">
                    Create harmonious color palettes based on skin tones for inclusive design
                  </p>
                </div>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="text-gray-500 hover:text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-all duration-300"
                  aria-label="Information"
                >
                  <FiInfo size={20} />
                </button>
              </div>

              {showInfo && (
                <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-6 rounded-2xl mb-8 border border-amber-100">
                  <p className="mb-2 text-sm text-gray-700">
                    This tool helps designers create inclusive color palettes that complement various skin tones.
                    Select a base skin color to generate a harmonious palette suitable for:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>UI design with diverse user representation</li>
                    <li>Portrait photography editing</li>
                    <li>Fashion and makeup color coordination</li>
                    <li>Accessible color contrast combinations</li>
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Base Skin Tone:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={skinColor}
                      onChange={(e) => setSkinColor(e.target.value)}
                      className="w-16 h-16 border-2 border-gray-200 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skinColor}
                        onChange={(e) => setSkinColor(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>HEX: {skinColor}</span>
                        <button
                          onClick={() => handleCopy(skinColor)}
                          className="flex items-center text-amber-600 hover:text-amber-800"
                        >
                          <FiCopy className="mr-1" /> {copied === skinColor ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    className="mt-6 w-full bg-gradient-to-r from-amber-600 to-rose-500 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-rose-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                  >
                    Generate Color Palette
                  </button>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Suggested Uses</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {['UI Design', 'Photography', 'Fashion', 'Makeup'].map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-amber-200 transition-all duration-300">
                          <h4 className="font-medium text-gray-700 mb-1">{item}</h4>
                          <p className="text-xs text-gray-500">
                            {item === 'UI Design' && 'Backgrounds, buttons, and accents'}
                            {item === 'Photography' && 'Backgrounds and color grading'}
                            {item === 'Fashion' && 'Complementary clothing colors'}
                            {item === 'Makeup' && 'Eyeshadow and lipstick tones'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Palette</h3>
                  {palette.length > 0 ? (
                    <PaletteDisplay palette={palette} onCopy={handleCopy} copied={copied} />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
                      <p className="text-gray-500">Your palette will appear here</p>
                    </div>
                  )}

                  <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <h4 className="font-semibold text-amber-800 mb-2">Design Tip</h4>
                    <p className="text-sm text-amber-700">
                      For accessible text contrast, use darker palette variants for text on light backgrounds,
                      and lighter variants for text on dark backgrounds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-10px) rotate(5deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-10px) rotate(-5deg); 
          }
        }
      `}</style>
    </div>
  );
};

export default SkinColorInput;