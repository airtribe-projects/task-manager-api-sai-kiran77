const express = require('express');
const router = express.Router();

// In-memory storage for tasks
let tasks = [];
let nextId = 1;

// GET /tasks - Retrieve all tasks
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a specific task by ID
router.get('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
    const { title, description, completed } = req.body;
    
    const newTask = {
        id: nextId++,
        title,
        description,
        completed
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    const { title, description, completed } = req.body;
    
    if (title !== undefined) {
        tasks[taskIndex].title = title;
    }
    
    if (description !== undefined) {
        tasks[taskIndex].description = description;
    }
    
    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }
    res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

module.exports = router;
