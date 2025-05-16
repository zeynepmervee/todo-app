const API_URL = 'http://localhost:5000/tasks';

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.title}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();

  if (!title) return alert('Task cannot be empty');

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  input.value = '';
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Sayfa yüklendiğinde görevleri getir
window.onload = fetchTasks;
