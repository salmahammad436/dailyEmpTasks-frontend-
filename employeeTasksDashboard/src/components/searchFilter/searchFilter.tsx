import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchFilter: React.FC = () => {
  return (
    <div className="flex justify-space-center py-4">
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search for an employee..."
          className="w-full pl-10 pr-4 py-2 border rounded-md outline-none"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <button className="px-4 py-2 border rounded-md mx-2">Filter</button>
    </div>
  );
};

export default SearchFilter;
