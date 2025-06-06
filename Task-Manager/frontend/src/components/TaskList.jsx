'use client';

import { useState, useEffect } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import TaskDropdown from './TaskDropdown';
import SearchFilter from './SearchFilter';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    // Apply filters whenever search term or status filter changes
    let result = tasks;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(task => task.status === statusFilter);
    }
    
    setFilteredTasks(result);
  }, [searchTerm, statusFilter, tasks]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status === 'All' ? 'All' : status);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update task');
      
      // Update local state
      setTasks(prev => 
        prev.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete task');
      
      // Update local state
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading tasks...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!filteredTasks.length) return (
    <div className="py-10">
      <SearchFilter onSearch={handleSearch} onFilter={handleStatusFilter} />
      <p className="text-center text-black">No tasks found. Create a new task to get started.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <SearchFilter onSearch={handleSearch} onFilter={handleStatusFilter} />
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="py-4 px-4 text-sm text-gray-900">{task.title}</td>
                <td className="py-4 px-4 text-sm text-gray-500">{task.description}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <TaskDropdown 
                      taskId={task.id} 
                      currentStatus={task.status} 
                      onStatusChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                    />
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete task"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}