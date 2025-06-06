const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data - would typically come from a database
let tasks = [
  { id: '1', title: 'Complete project proposal', description: 'Draft and finalize project proposal document', status: 'Pending' },
  { id: '2', title: 'Client meeting preparation', description: 'Prepare slides and talking points for upcoming client presentation', status: 'In Progress' },
  { id: '3', title: 'Backend API development', description: 'Implement REST API endpoints for user authentication', status: 'Completed' },
  { id: '4', title: 'Frontend component library', description: 'Create reusable UI components using React', status: 'In Progress' },
  { id: '5', title: 'Documentation update', description: 'Update API documentation with new endpoints', status: 'Pending' }
];

// Routes
// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(task => task.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// POST new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    ...req.body
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(task => task.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });
  
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(task => task.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });
  
  tasks.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});