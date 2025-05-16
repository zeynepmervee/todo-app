// backend/app.js
const express = require('express');
const cors = require('cors');
const { getTasks, addTask, deleteTask, updateTask } = require('./controllers/taskController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', getTasks);
app.post('/tasks', addTask);
app.delete('/tasks/:id', deleteTask);
app.patch('/tasks/:id', updateTask);

module.exports = app;
