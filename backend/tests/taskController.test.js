import { jest } from '@jest/globals';
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  _internal
} from '../controllers/taskController.js';

describe('Task Controller', () => {
  let req, res;

  beforeEach(() => {
    _internal.resetTasks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  test('should add a valid task', () => {
    req = { body: { title: 'Test Task' } };
    addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Task' }));
  });

  test('should reject empty task title', () => {
    req = { body: { title: '   ' } };
    addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Task title is required' });
  });
});
