import React from 'react';
import SkinColorInput from './components/SkinColorInput';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">Color Palette Creator</h1>
      <SkinColorInput />
    </div>
  );
};

export default App;
