// backend/app.js
import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the /frontend directory
app.use(express.static(join(__dirname, '../frontend')));

// Routes
app.use('/tasks', tasksRouter);

// Root endpoint - serve index.html
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
