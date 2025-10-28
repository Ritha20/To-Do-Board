import React from 'react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold font-mono italic text-amber-600">Free Task Board</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-amber-700 hover:text-gray-500 transition text-xl">
          🔔
        </button>
        <div className="flex rounded-full font-semibold w-10 h-10 justify-center items-center text-white bg-amber-500">IR</div>
      </div>
    </nav>
  );
};

export default Navigation;