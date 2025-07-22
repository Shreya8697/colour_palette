import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Info, Check, Palette, Download, Sparkles } from 'lucide-react';

// Simple tinycolor replacement for basic color validation
const isValidColor = (color) => {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
};

const PaletteDisplay = ({ palette }) => {
  if (palette.length === 0) return null;
  
  return (
    <div className="grid grid-cols-5 gap-1 rounded-lg overflow-hidden shadow-lg">
      {palette.map((color, idx) => (
        <div
          key={idx}
          className="h-16 flex items-end justify-center pb-2"
          style={{ backgroundColor: color }}
        >
          <span 
            className="text-xs font-mono px-2 py-1 rounded backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: '#333'
            }}
          >
            {color}
          </span>
        </div>
      ))}
    </div>
  );
};

const HexPaletteCreator = () => {
  const [hexInput, setHexInput] = useState('');
  const [palette, setPalette] = useState([]);
  const [copied, setCopied] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [paletteName, setPaletteName] = useState('My Palette');

  useEffect(() => {
    // Initialize with some sample colors for demo
    if (palette.length === 0) {
      setPalette(['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#10b981']);
    }
  }, []);

  const addColor = () => {
    const hex = hexInput.trim();
    let color = hex;

    // Handle 3-digit hex codes
    if (/^#?[0-9A-F]{3}$/i.test(hex)) {
      color = `#${hex.replace('#', '').split('').map(c => c + c).join('')}`;
    } else if (!hex.startsWith('#') && hex.length > 0) {
      color = `#${hex}`;
    }

    const isValid = isValidColor(color) && /^#[0-9A-F]{6}$/i.test(color);

    if (isValid) {
      if (!palette.includes(color.toLowerCase())) {
        setPalette([...palette, color.toLowerCase()]);
        setHexInput('');
      } else {
        alert('This color is already in your palette!');
      }
    } else {
      alert('Please enter a valid HEX color code (e.g., #FF5733 or FFC0CB)');
    }
  };

  const removeColor = (hexToRemove) => {
    setPalette(palette.filter((hex) => hex !== hexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addColor();
    }
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearPalette = () => {
    if (window.confirm('Are you sure you want to clear your palette?')) {
      setPalette([]);
    }
  };

  const exportPalette = () => {
    const paletteString = palette.join(', ');
    navigator.clipboard.writeText(paletteString);
    alert(`Palette copied to clipboard: ${paletteString}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        
        {/* Floating Color Circles */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-60"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        ></div>
        <div 
          className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }}
        ></div>
        <div 
          className="absolute bottom-32 right-1/3 w-24 h-24 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-40"
          style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '0.5s' }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Palette className="relative h-12 w-12 text-purple-600" style={{ animation: 'bounce 2s infinite' }} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              HEX Palette Creator
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create stunning color palettes with <span className="text-purple-600 font-semibold">intelligent color theory</span> and <span className="text-pink-600 font-semibold">harmony suggestions</span>
            </p>
          </div>

          {/* Main Content Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl"></div>
            <div className="relative bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-white/20">
              
              {/* Info Toggle */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Build Your Perfect Palette</h2>
                  <p className="text-gray-600">
                    Craft and manage your custom color combinations with precision
                  </p>
                </div>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="group relative text-gray-500 hover:text-purple-600 p-3 rounded-full hover:bg-purple-50 transition-all duration-300"
                  aria-label="Information"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <Info size={20} className="relative" />
                </button>
              </div>

              {showInfo && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-8 border border-purple-100">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="mb-3 font-medium text-gray-800">
                        Professional color palette management for designers and developers:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span>Save frequently used color combinations</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                          <span>Test color harmonies before implementation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          <span>Share palettes with team members</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>Export for use in design tools</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column - Controls */}
                <div className="space-y-8">
                  {/* Palette Name */}
                  <div className="group">
                    <label htmlFor="paletteName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Palette Name
                    </label>
                    <input
                      id="paletteName"
                      type="text"
                      value={paletteName}
                      onChange={(e) => setPaletteName(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 group-hover:border-gray-300 bg-white/80 backdrop-blur-sm"
                      placeholder="Name your masterpiece"
                    />
                  </div>

                  {/* Color Input */}
                  <div className="group">
                    <label htmlFor="hexInput" className="block text-sm font-semibold text-gray-700 mb-2">
                      Add HEX Color
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-grow">
                        <input
                          id="hexInput"
                          type="text"
                          placeholder="e.g. #FF5733 or FFC0CB"
                          value={hexInput}
                          onChange={(e) => setHexInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full p-4 pl-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 group-hover:border-gray-300 bg-white/80 backdrop-blur-sm"
                        />
                        {hexInput && isValidColor(hexInput.startsWith('#') ? hexInput : `#${hexInput}`) && (
                          <div
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 border-2 border-white rounded-lg shadow-sm"
                            style={{ backgroundColor: hexInput.startsWith('#') ? hexInput : `#${hexInput}` }}
                          />
                        )}
                      </div>
                      <button
                        onClick={addColor}
                        className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center space-x-2"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="font-semibold">Add</span>
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {hexInput && isValidColor(hexInput.startsWith('#') ? hexInput : `#${hexInput}`) ? (
                        <span className="text-green-600 font-medium">✓ Valid HEX color</span>
                      ) : hexInput ? (
                        <span className="text-red-600 font-medium">✗ Invalid HEX format</span>
                      ) : (
                        'Enter 3 or 6-digit HEX code (with or without #)'
                      )}
                    </p>
                  </div>

                  {/* Palette Actions */}
                  {palette.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Palette Actions</h3>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {palette.length} colors
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={clearPalette}
                          className="group flex items-center justify-center bg-red-50 text-red-600 px-4 py-3 rounded-xl hover:bg-red-100 hover:scale-105 transform transition-all duration-300 font-medium"
                        >
                          <Trash2 className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                          Clear All
                        </button>
                        <button
                          onClick={exportPalette}
                          className="group flex items-center justify-center bg-green-50 text-green-600 px-4 py-3 rounded-xl hover:bg-green-100 hover:scale-105 transform transition-all duration-300 font-medium"
                        >
                          <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                          Export
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                      Pro Tips
                    </h3>
                    <ul className="text-sm space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        Include both light and dark shades for proper contrast
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        Limit palettes to 5-7 colors for visual harmony
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-500 mr-2">•</span>
                        Test accessibility with WCAG contrast guidelines
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        Export and share with your design team
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Palette Display */}
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800">{paletteName}</h3>
                      {palette.length > 0 && (
                        <button
                          onClick={exportPalette}
                          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 transform"
                        >
                          Copy All
                        </button>
                      )}
                    </div>

                    {palette.length > 0 ? (
                      <>
                        <PaletteDisplay palette={palette} />

                        <div className="mt-8">
                          <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                            <Copy className="w-4 h-4 mr-2" />
                            Color Details
                          </h4>
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {palette.map((hex, idx) => (
                              <div
                                key={idx}
                                className="group flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                              >
                                <div className="flex items-center">
                                  <div
                                    className="w-8 h-8 rounded-lg mr-4 border-2 border-white shadow-md group-hover:scale-110 transform transition-transform duration-300"
                                    style={{ backgroundColor: hex }}
                                  />
                                  <span className="font-mono text-sm font-medium text-gray-700">{hex}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => copyToClipboard(hex)}
                                    className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
                                    title="Copy color"
                                  >
                                    {copied === hex ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => removeColor(hex)}
                                    className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-300"
                                    title="Remove color"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                        <div className="mb-4">
                          <Palette className="w-12 h-12 text-gray-300 mx-auto" />
                        </div>
                        <p className="text-gray-500 mb-2 font-medium">Your palette awaits</p>
                        <p className="text-sm text-gray-400">
                          Add colors using the HEX input to see your palette come to life
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Animations */}
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
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
              transform: translate3d(0, -10px, 0);
            }
            70% {
              animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
              transform: translate3d(0, -5px, 0);
            }
            90% {
              transform: translate3d(0,-1px,0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default HexPaletteCreator;