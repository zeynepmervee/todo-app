import { jest } from '@jest/globals';
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  _internal
} from '../controllers/taskController.js';
import Task from '../models/Task.js';
import sequelize from '../models/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Task Controller', () => {
  let req, res;

  beforeEach(async () => {
    await _internal.resetTasks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  test('should add a valid task', async () => {
    req = { body: { title: 'Test Task' } };
    await addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
      title: 'Test Task',
      completed: false
    }));
  });

  test('should reject empty task title', async () => {
    req = { body: { title: '   ' } };
    await addTask(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Task title is required' });
  });

  test('should get all tasks', async () => {
    await Task.create({ title: 'Test Task', completed: false });
    
    await getTasks(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ title: 'Test Task' })
    ]));
  });

  test('should delete a task', async () => {
    const task = await Task.create({ title: 'To Delete', completed: false });
    
    req = { params: { id: task.id } };
    await deleteTask(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  test('should update a task', async () => {
    const task = await Task.create({ title: 'Old', completed: false });
    
    req = { 
      params: { id: task.id },
      body: { title: 'Updated', completed: true }
    };
    await updateTask(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Updated',
      completed: true
    }));
  });
  
  test('should return 404 if task to update does not exist', async () => {
    req = {
      params: { id: 999 },
      body: { title: 'Updated Title' }
    };
    await updateTask(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Task not found' });
  });

  test('should return 404 if task to delete does not exist', async () => {
    req = { params: { id: 999 } };
    await deleteTask(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Task not found' });
  });

  test('should accept and store a very long task title', async () => {
    const longTitle = 'A'.repeat(1000);
    req = { body: { title: longTitle } };

    await addTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: longTitle,
      completed: false
    }));
  });
});
