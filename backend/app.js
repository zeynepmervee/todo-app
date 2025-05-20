import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Task from './models/Task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(join(__dirname, '../frontend')));

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'production') {
  console.log('Development mode: clearing tasks...');
  await Task.destroy({ where: {} });
}

export default app;
