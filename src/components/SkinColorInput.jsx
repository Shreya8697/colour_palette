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
    // Generate initial palette on component mount
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
    <div className="p-8 bg-white shadow-xl rounded-xl max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Skin Tone Palette Generator</h2>
          <p className="text-gray-600">
            Create harmonious color palettes based on skin tones for inclusive design
          </p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          aria-label="Information"
        >
          <FiInfo size={20} />
        </button>
      </div>

      {showInfo && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm text-gray-700">
          <p className="mb-2">
            This tool helps designers create inclusive color palettes that complement various skin tones.
            Select a base skin color to generate a harmonious palette suitable for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>UI design with diverse user representation</li>
            <li>Portrait photography editing</li>
            <li>Fashion and makeup color coordination</li>
            <li>Accessible color contrast combinations</li>
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Base Skin Tone:
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="color"
              value={skinColor}
              onChange={(e) => setSkinColor(e.target.value)}
              className="w-16 h-16 border-2 border-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex-1">
              <input
                type="text"
                value={skinColor}
                onChange={(e) => setSkinColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>HEX: {skinColor}</span>
                <button
                  onClick={() => handleCopy(skinColor)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FiCopy className="mr-1" /> {copied === skinColor ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-medium shadow-md"
          >
            Generate Color Palette
          </button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Suggested Uses</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-1">UI Design</h4>
                <p className="text-xs text-gray-500">Backgrounds, buttons, and accents</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-1">Photography</h4>
                <p className="text-xs text-gray-500">Backgrounds and color grading</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-1">Fashion</h4>
                <p className="text-xs text-gray-500">Complementary clothing colors</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-1">Makeup</h4>
                <p className="text-xs text-gray-500">Eyeshadow and lipstick tones</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Generated Palette</h3>
          {palette.length > 0 ? (
            <PaletteDisplay palette={palette} onCopy={handleCopy} copied={copied} />
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-500">Your palette will appear here</p>
            </div>
          )}

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h4 className="font-medium text-yellow-800 mb-2">Design Tip</h4>
            <p className="text-sm text-yellow-700">
              For accessible text contrast, use darker palette variants for text on light backgrounds,
              and lighter variants for text on dark backgrounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinColorInput;