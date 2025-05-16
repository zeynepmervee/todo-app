import express from 'express';
import { getTasks, addTask, deleteTask, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);

export default router;
