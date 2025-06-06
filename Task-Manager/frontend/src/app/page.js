'use client';

import TaskList from '../components/TaskList';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Task Management</h1>
          <p className="text-gray-600">Manage and track your tasks efficiently</p>
        </div>
        <Link 
          href="/create-task" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </Link>
      </div>
      
      {/* Task List Component */}
      <TaskList />
    </div>
  );
}