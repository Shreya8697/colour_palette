import React from 'react';

const PaletteDisplay = ({ palette }) => {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Suggested Palette:</h3>
      <div className="flex gap-2">
        {palette.map((color, idx) => (
          <div
            key={idx}
            className="w-12 h-12 rounded-lg border"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {palette.map((color, idx) => (
          <code key={idx} className="px-2 py-1 bg-gray-100 rounded">{color}</code>
        ))}
      </div>
    </div>
  );
};

export default PaletteDisplay;
