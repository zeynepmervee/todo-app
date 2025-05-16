let tasks = [];
let currentId = 1;

export function getTasks(req, res) {
  res.json(tasks);
}

export function addTask(req, res) {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const newTask = {
    id: currentId++,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
}

export function deleteTask(req, res) {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
}

export function updateTask(req, res) {
  const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id == id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
}

export const _internal = {};
Object.defineProperty(_internal, 'tasks', {
  get: () => tasks
});
_internal.resetTasks = () => {
  tasks = [];
  currentId = 1;
};
