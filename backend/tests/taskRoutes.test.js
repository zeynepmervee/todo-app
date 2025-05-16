import request from 'supertest';
import app from '../app.js';
import { _internal } from '../controllers/taskController.js';
import { jest } from '@jest/globals';

describe('Task API routes', () => {
  beforeEach(() => {
    _internal.resetTasks();
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
    expect(res.body).toEqual(expect.objectContaining({ title: 'New Task', completed: false }));
  });

  test('DELETE /tasks/:id deletes a task', async () => {
    const task = { id: 1, title: 'To Delete', completed: false };
    _internal.tasks.push(task);
    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.statusCode).toBe(204);
  });

  test('PATCH /tasks/:id updates a task', async () => {
    const task = { id: 1, title: 'Old', completed: false };
    _internal.tasks.push(task);

    const res = await request(app)
      .patch(`/tasks/${task.id}`)
      .send({ title: 'Updated', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({ title: 'Updated', completed: true }));
  });
});
