import request from 'supertest';
import app from '../app.js';
import { _internal } from '../controllers/taskController.js';
import Task from '../models/Task.js';
import sequelize from '../models/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Task API routes', () => {
  beforeEach(async () => {
    await _internal.resetTasks();
  });

  test('GET /tasks returns empty array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /tasks creates new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'New Task' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({ 
      title: 'New Task', 
      completed: false 
    }));
  });

  test('DELETE /tasks/:id deletes a task', async () => {
    // Create a task first
    const task = await Task.create({ title: 'To Delete', completed: false });
    
    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.statusCode).toBe(204);
  });

  test('PATCH /tasks/:id updates a task', async () => {
    // Create a task first
    const task = await Task.create({ title: 'Old', completed: false });

    const res = await request(app)
      .patch(`/tasks/${task.id}`)
      .send({ title: 'Updated', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ 
      title: 'Updated', 
      completed: true 
    }));
  });
});
