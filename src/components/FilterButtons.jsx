import React from 'react';

const FilterButtons = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'View All', baseClass: 'bg-amber-500 text-white hover:bg-amber-600' },
    { key: 'pending', label: 'Pending Tasks', baseClass: 'bg-amber-200 text-amber-800 hover:bg-amber-300' },
    { key: 'completed', label: 'Completed Tasks', baseClass: 'bg-amber-300 text-white hover:bg-amber-400' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center mb-8 gap-2 sm:gap-4">
      {filters.map(({ key, label, baseClass }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded transition text-sm sm:text-base ${
            currentFilter === key ? 'bg-amber-600 text-white' : baseClass
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;