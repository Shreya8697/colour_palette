import React, { useState } from 'react';
import PaletteDisplay from './PaletteDisplay';

const HexPaletteCreator = () => {
  const [hexInput, setHexInput] = useState('');
  const [palette, setPalette] = useState([]);

  const addColor = () => {
    const hex = hexInput.trim();
    const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex);

    if (isValidHex && !palette.includes(hex)) {
      setPalette([...palette, hex]);
      setHexInput('');
    } else {
      alert('Enter a valid and unique HEX code!');
    }
  };

  const removeColor = (hexToRemove) => {
    setPalette(palette.filter((hex) => hex !== hexToRemove));
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">🎨 Create Your Custom Palette</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="#abcdef"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={addColor}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      {palette.length > 0 && (
        <>
          <PaletteDisplay palette={palette} />

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Click to Remove a Color:</h3>
            <div className="flex gap-2 flex-wrap">
              {palette.map((hex, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded border hover:bg-red-200"
                  onClick={() => removeColor(hex)}
                >
                  {hex} ✕
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HexPaletteCreator;
