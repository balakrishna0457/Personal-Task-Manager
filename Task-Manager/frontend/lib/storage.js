// Local storage keys
const STORAGE_KEYS = {
    TASKS: 'task-management-tasks',
  };
  
  // Check if we're running in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  /**
   * Save tasks to local storage
   * @param {Array} tasks - Array of task objects
   */
  export const saveTasks = (tasks) => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to local storage:', error);
    }
  };
  
  /**
   * Get tasks from local storage
   * @returns {Array} Array of task objects or empty array if none found
   */
  export const getTasks = () => {
    if (!isBrowser) return [];
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error getting tasks from local storage:', error);
      return [];
    }
  };
  
  /**
   * Add a new task to local storage
   * @param {Object} task - Task object to add
   * @returns {Object} The added task with generated ID
   */
  export const addTask = (task) => {
    if (!isBrowser) return null;
    try {
      const tasks = getTasks();
      const newTask = {
        ...task,
        id: Date.now().toString(), // Generate a unique ID
      };
      tasks.push(newTask);
      saveTasks(tasks);
      return newTask;
    } catch (error) {
      console.error('Error adding task to local storage:', error);
      return null;
    }
  };
  
  /**
   * Update a task in local storage
   * @param {string} taskId - ID of the task to update
   * @param {Object} updatedFields - Object containing fields to update
   * @returns {Object|null} Updated task or null if not found
   */
  export const updateTask = (taskId, updatedFields) => {
    if (!isBrowser) return null;
    try {
      const tasks = getTasks();
      const index = tasks.findIndex(task => task.id === taskId);
      if (index === -1) return null;
      
      tasks[index] = { ...tasks[index], ...updatedFields };
      saveTasks(tasks);
      return tasks[index];
    } catch (error) {
      console.error('Error updating task in local storage:', error);
      return null;
    }
  };
  
  /**
   * Delete a task from local storage
   * @param {string} taskId - ID of the task to delete
   * @returns {boolean} True if successful, false otherwise
   */
  export const deleteTask = (taskId) => {
    if (!isBrowser) return false;
    try {
      const tasks = getTasks();
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      saveTasks(filteredTasks);
      return true;
    } catch (error) {
      console.error('Error deleting task from local storage:', error);
      return false;
    }
  };