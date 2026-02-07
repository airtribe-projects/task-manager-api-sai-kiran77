const express = require('express');
const router = express.Router();

// In-memory storage for tasks
let tasks = [];
let nextId = 1;

// GET /tasks - Retrieve all tasks with filtering and sorting
router.get('/', (req, res) => {
    let filteredTasks = [...tasks];
    
    // Filter by completion status
    const { completed, sort } = req.query;
    if (completed !== undefined) {
        if (completed !== 'true' && completed !== 'false') {
            return res.status(400).json({ error: 'Completed query parameter must be true or false' });
        }
        const isCompleted = completed === 'true';
        filteredTasks = filteredTasks.filter(t => t.completed === isCompleted);
    }
    
    // Sort by creation date
    if (sort !== undefined) {
        if (sort.toLowerCase() !== 'asc' && sort.toLowerCase() !== 'desc') {
            return res.status(400).json({ error: 'Sort query parameter must be asc or desc' });
        }
        if (sort.toLowerCase() === 'asc') {
            filteredTasks.sort((a, b) => a.createdAt - b.createdAt);  // Oldest first
        } else {
            filteredTasks.sort((a, b) => b.createdAt - a.createdAt);  // Newest first
        }
    }
    
    res.status(200).json(filteredTasks);
});

// GET /tasks/priority/:level - Retrieve tasks by priority level
router.get('/priority/:level', (req, res) => {
    const { level } = req.params;
    const validPriorities = ['low', 'medium', 'high'];
    
    // Validate priority level
    if (!validPriorities.includes(level.toLowerCase())) {
        return res.status(400).json({ error: 'Priority level must be low, medium, or high' });
    }
    
    const priorityTasks = tasks.filter(t => t.priority === level.toLowerCase());
    res.status(200).json(priorityTasks);
});

// GET /tasks/:id - Retrieve a specific task by ID
router.get('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Validate ID format
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID format' });
    }
    
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(task);
});

// POST /tasks - Create a new task
router.post('/', (req, res) => {
    const { title, description, completed = false, priority = 'medium' } = req.body;
    
    // Validate title
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }
    
    // Validate description
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required and must be a non-empty string' });
    }
    
    // Validate completed
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean value' });
    }
    
    // Validate priority
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }
    
    const newTask = {
        id: nextId++,
        title: title.trim(),
        description: description.trim(),
        completed,
        priority: priority.toLowerCase(),
        createdAt: new Date()
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Validate ID format
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID format' });
    }
    
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    const { title, description, completed, priority } = req.body;
    
    // Check if at least one field is provided
    if (title === undefined && description === undefined && completed === undefined && priority === undefined) {
        return res.status(400).json({ error: 'At least one field (title, description, completed, or priority) must be provided' });
    }
    
    // Validate title if provided
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Title must be a non-empty string' });
        }
        tasks[taskIndex].title = title.trim();
    }
    
    // Validate description if provided
    if (description !== undefined) {
        if (typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ error: 'Description must be a non-empty string' });
        }
        tasks[taskIndex].description = description.trim();
    }
    
    // Validate completed if provided
    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed must be a boolean value' });
        }
        tasks[taskIndex].completed = completed;
    }
    
    // Validate priority if provided
    if (priority !== undefined) {
        const validPriorities = ['low', 'medium', 'high'];
        if (!validPriorities.includes(priority.toLowerCase())) {
            return res.status(400).json({ error: 'Priority must be low, medium, or high' });
        }
        tasks[taskIndex].priority = priority.toLowerCase();
    }
    
    res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Validate ID format
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID format' });
    }
    
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

module.exports = router;
