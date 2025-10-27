import React from 'react';

const Navigation = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  return (
    <nav className="bg-white shadow p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold font-mono italic text-amber-600">Task Board</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <form className="flex items-center w-full sm:w-64" onSubmit={onSearchSubmit}>
          <input
            type="text"
            placeholder="Search Task"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-2 border border-amber-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button type="submit" className="bg-amber-500 text-amber-700 px-4 py-2 rounded-r-md hover:bg-amber-400 transition">
            🔍<i className="fas fa-magnifying-glass"></i>
          </button>
        </form>
        <button className="text-amber-700 hover:text-gray-500 transition">
          <i className="fa-regular fa-bell"></i>
        </button>
        <div className="flex rounded-full font-semibold w-10 h-10 justify-center items-center text-white bg-amber-500">IR</div>
      </div>
    </nav>
  );
};

export default Navigation;