'use client';

import TaskForm from '../../components/TaskForm';
import Link from 'next/link';

export default function CreateTaskPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Create New Task</h1>
        <Link 
          href="/" 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Tasks
        </Link>
      </div>
      
      {/* Task Form Component */}
      <TaskForm />
    </div>
  );
}