import Task from '../models/Task.js';

export async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function addTask(req, res) {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }

  try {
    const newTask = await Task.create({
      title: title.trim(),
      completed: false
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function deleteTask(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deleted = await Task.destroy({
      where: { id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

export async function updateTask(req, res) {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
}

export const _internal = {
  resetTasks: async () => {
    await Task.destroy({ where: {} });
  }
};
