import React, { useState } from 'react';

const SplitDropdown = ({splitValue , setSplitValue}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelection = (value) => {
    setSplitValue(value); // Update the local state
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md bg-gray-700 text-white px-4 py-1 border border-green-600 text-sm font-medium"
      >
        {splitValue}
        <svg
          className={`w-5 h-5 ml-2 transition-transform transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          <div className="py-1 text-sm text-gray-300">
            <button
              onClick={() => handleSelection('All')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              All
            </button>
            <button
              onClick={() => handleSelection('Train')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Train
            </button>
            <button
              onClick={() => handleSelection('Valid')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Valid
            </button>
            <button
              onClick={() => handleSelection('Test')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitDropdown;
