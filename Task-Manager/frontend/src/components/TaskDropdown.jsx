'use client';

import { useState } from 'react';
import { HiChevronDown, HiCheck } from 'react-icons/hi';

const statuses = ['Pending', 'In Progress', 'Completed'];

export default function TaskDropdown({ taskId, currentStatus, onStatusChange, isFilter, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus || (isFilter ? 'All' : 'Select Status'));
  const [isLoading, setIsLoading] = useState(false);

  // Options list depends on whether this is a filter dropdown
  const options = isFilter ? ['All', ...statuses] : statuses;

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusChange = async (newStatus) => {
    setIsOpen(false);
    
    if (isFilter) {
      setStatus(newStatus);
      if (onSelect) onSelect(newStatus);
      return;
    }

    if (newStatus === status) return;
    
    setIsLoading(true);
    try {
      if (onStatusChange) {
        await onStatusChange(newStatus);
        setStatus(newStatus);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get the appropriate background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium ${
            isFilter ? 'text-gray-700' : getStatusColor(status)
          } hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : status}
          <HiChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((statusOption) => (
              <button
                key={statusOption}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
                  status === statusOption ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } hover:bg-gray-100 hover:text-gray-900`}
                role="menuitem"
                onClick={() => handleStatusChange(statusOption)}
              >
                {statusOption}
                {status === statusOption && (
                  <HiCheck className="h-5 w-5 text-green-500" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}