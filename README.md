# Task Manager API

A RESTful API for managing tasks with features like filtering, sorting, and priority management. Built with Node.js and Express.js with in-memory data storage.

## Overview

This Task Manager API allows you to perform CRUD (Create, Read, Update, Delete) operations on tasks. Each task has the following attributes:
- **id**: Unique identifier (auto-generated)
- **title**: Task title (required)
- **description**: Task description (required)
- **completed**: Completion status (boolean, default: false)
- **priority**: Task priority - low, medium, or high (default: medium)
- **createdAt**: Timestamp when task was created (auto-generated)

## Features

- ✅ Create, Read, Update, and Delete tasks
- ✅ Filter tasks by completion status
- ✅ Filter tasks by priority level
- ✅ Sort tasks by creation date (ascending/descending)
- ✅ Input validation and error handling
- ✅ In-memory data storage

## Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd task-manager-api-sai-kiran77
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
node app.js
```

The server will start on `http://localhost:3000`

You should see the message:
```
Server is listening on 3000
```

## API Endpoints

### 1. Get All Tasks
Retrieve all tasks with optional filtering and sorting.

**Endpoint:** `GET /tasks`

**Query Parameters:**
- `completed` (optional): Filter by completion status (`true` or `false`)
- `sort` (optional): Sort by creation date (`asc` for oldest first, `desc` for newest first)

**Examples:**
```bash
# Get all tasks
curl http://localhost:3000/tasks

# Get completed tasks only
curl http://localhost:3000/tasks?completed=true

# Get incomplete tasks only
curl http://localhost:3000/tasks?completed=false

# Get all tasks sorted by oldest first
curl http://localhost:3000/tasks?sort=asc

# Get all tasks sorted by newest first
curl http://localhost:3000/tasks?sort=desc

# Get incomplete tasks sorted by newest first
curl http://localhost:3000/tasks?completed=false&sort=desc
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the task manager API",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-02-07T17:14:14.283Z"
  }
]
```

---

### 2. Get Task by ID
Retrieve a specific task by its ID.

**Endpoint:** `GET /tasks/:id`

**Example:**
```bash
curl http://localhost:3000/tasks/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager API",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-02-07T17:14:14.283Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid ID format
- `404 Not Found` - Task not found

---

### 3. Get Tasks by Priority
Retrieve all tasks with a specific priority level.

**Endpoint:** `GET /tasks/priority/:level`

**Priority Levels:** `low`, `medium`, `high`

**Examples:**
```bash
# Get high priority tasks
curl http://localhost:3000/tasks/priority/high

# Get medium priority tasks
curl http://localhost:3000/tasks/priority/medium

# Get low priority tasks
curl http://localhost:3000/tasks/priority/low
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Critical Bug",
    "description": "Fix production issue",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-02-07T17:14:14.283Z"
  }
]
```

**Error Response:**
- `400 Bad Request` - Invalid priority level

---

### 4. Create Task
Create a new task.

**Endpoint:** `POST /tasks`

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "priority": "medium"
}
```

**Required Fields:**
- `title` (string, non-empty)
- `description` (string, non-empty)

**Optional Fields:**
- `completed` (boolean, default: `false`)
- `priority` (string: "low", "medium", or "high", default: `"medium"`)

**Example:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete documentation",
    "description": "Write comprehensive API documentation",
    "completed": false,
    "priority": "high"
  }'
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-02-07T17:14:14.283Z"
}
```

**Error Response:**
- `400 Bad Request` - Missing required fields or invalid data types

---

### 5. Update Task
Update an existing task by ID.

**Endpoint:** `PUT /tasks/:id`

**Request Body:** (all fields optional, but at least one required)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "priority": "low"
}
```

**Example:**
```bash
# Mark task as completed
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Update priority
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"priority": "high"}'

# Update multiple fields
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "completed": true,
    "priority": "low"
  }'
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Task description",
  "completed": true,
  "priority": "low",
  "createdAt": "2026-02-07T17:14:14.283Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid ID format, no fields provided, or invalid data
- `404 Not Found` - Task not found

---

### 6. Delete Task
Delete a task by ID.

**Endpoint:** `DELETE /tasks/:id`

**Example:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Response:** `204 No Content`

**Error Responses:**
- `400 Bad Request` - Invalid ID format
- `404 Not Found` - Task not found

---

## Error Handling

All error responses follow this format:
```json
{
  "error": "Error message description"
}
```

### Common Error Codes:
- **400 Bad Request** - Invalid input, missing required fields, or malformed data
- **404 Not Found** - Resource (task) not found
- **500 Internal Server Error** - Server error (rare with in-memory storage)

## Testing the API

### Using cURL

All examples in this documentation use cURL. Make sure the server is running before testing.

### Using Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Add appropriate headers: `Content-Type: application/json`
4. Test each endpoint with the examples provided

### Test Scenarios

#### Basic CRUD Operations:
```bash
# 1. Create a task
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Test Task","description":"Testing API","completed":false,"priority":"medium"}'

# 2. Get all tasks
curl http://localhost:3000/tasks

# 3. Get specific task (use ID from step 1)
curl http://localhost:3000/tasks/1

# 4. Update task
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"completed":true}'

# 5. Delete task
curl -X DELETE http://localhost:3000/tasks/1
```

#### Filtering and Sorting:
```bash
# Create multiple tasks with different priorities and statuses
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"High Priority","description":"Important task","completed":false,"priority":"high"}'

curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Low Priority","description":"Can wait","completed":true,"priority":"low"}'

# Filter completed tasks
curl http://localhost:3000/tasks?completed=true

# Get high priority tasks
curl http://localhost:3000/tasks/priority/high

# Sort by newest first
curl http://localhost:3000/tasks?sort=desc
```

#### Error Handling:
```bash
# Test invalid ID
curl http://localhost:3000/tasks/abc

# Test missing required fields
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"description":"No title"}'

# Test invalid priority
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Test","description":"Test","priority":"urgent"}'

# Test non-existent task
curl http://localhost:3000/tasks/999
```

## Project Structure

```
task-manager-api-sai-kiran77/
├── app.js                 # Main application file
├── routes/
│   └── tasks.js          # Task routes and business logic
├── test/
│   └── server.test.js    # Test files
├── package.json          # Project dependencies
└── README.md            # This file
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JavaScript** - Programming language

## Data Storage
This API uses **in-memory storage**, which means:
- Data is stored in a JavaScript array
- Data is lost when the server restarts
- Suitable for development and testing
- For production, consider integrating a database (MongoDB, PostgreSQL, etc.)

## Limitations
- No persistent storage (data is lost on server restart)
- No authentication/authorization
- No pagination for large datasets
- Single server instance (no clustering)

## License
ISC

## Author
Sai Kiran

## Support
For issues or questions, please create an issue in the repository.
