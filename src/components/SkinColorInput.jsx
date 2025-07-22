import React, { useState } from 'react';
import generatePalette from '../utils/generatePalette';
import PaletteDisplay from './PaletteDisplay';

const SkinColorInput = () => {
  const [skinColor, setSkinColor] = useState('#c68642');
  const [palette, setPalette] = useState([]);

  const handleGenerate = () => {
    const newPalette = generatePalette(skinColor);
    setPalette(newPalette);
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🎨 Skin Tone Palette Generator</h2>
      <label className="block mb-2 text-gray-700">Select Your Skin Tone:</label>
      <input
        type="color"
        value={skinColor}
        onChange={(e) => setSkinColor(e.target.value)}
        className="w-full h-12 border rounded mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Generate Matching Palette
      </button>

      {palette.length > 0 && <PaletteDisplay palette={palette} />}
    </div>
  );
};

export default SkinColorInput;
