'use client';

import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import TaskDropdown from './TaskDropdown';

export default function SearchFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    onFilter(status);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="h-5 w-5 text-black" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search tasks..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      
      <div className="flex items-center">
        <span className="text-sm text-black mr-2">Filter:</span>
        <TaskDropdown isFilter={true} onSelect={handleStatusFilter} />
      </div>
    </div>
  );
}