import * as storage from './storage';

/**
 * Fetch all tasks with fallback to local storage
 */
export async function fetchTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.warn('Using local storage fallback for tasks:', error);
    return storage.getTasks();
  }
}

/**
 * Create a new task with fallback to local storage
 */
export async function createTask(task) {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.warn('Using local storage fallback for task creation:', error);
    return storage.addTask(task);
  }
}

/**
 * Update a task with fallback to local storage
 */
export async function updateTask(taskId, updatedFields) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.warn('Using local storage fallback for task update:', error);
    return storage.updateTask(taskId, updatedFields);
  }
}

/**
 * Delete a task with fallback to local storage
 */
export async function deleteTask(taskId) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('API request failed');
    return true;
  } catch (error) {
    console.warn('Using local storage fallback for task deletion:', error);
    return storage.deleteTask(taskId);
  }
}