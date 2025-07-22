import React from 'react';
import SkinColorInput from './components/SkinColorInput';
import HexPaletteCreator from './components/HexPaletteCreator';
import CodeCompiler from './components/CodeCompiler';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <h1 className="text-3xl font-bold text-center py-6">Color Palette Creator + Code Compiler</h1>

      <SkinColorInput />
      <HexPaletteCreator />
      <CodeCompiler />
    </div>
  );
};

export default App;
