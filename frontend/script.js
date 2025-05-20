const API_URL = 'http://localhost:5000/tasks';

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} 
          onchange="toggleTask(${task.id}, this.checked)">
        <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
      </div>
      <div class="task-actions">
        <button class="edit-btn" onclick="startEdit(${task.id}, '${task.title.replace(/'/g, "\\'")}')">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
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

async function updateTask(id, updates) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  fetchTasks();
}

async function toggleTask(id, completed) {
  await updateTask(id, { completed });
}

function startEdit(id, currentTitle) {
  const taskElement = document.querySelector(`li:has(button[onclick="startEdit(${id}, '${currentTitle.replace(/'/g, "\\'")}')"])`);
  const titleSpan = taskElement.querySelector('.task-title');
  const editBtn = taskElement.querySelector('.edit-btn');
  
  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentTitle;
  input.className = 'edit-input';
  
  // Replace span with input
  titleSpan.replaceWith(input);
  input.focus();
  
  // Change edit button to save
  editBtn.textContent = 'Save';
  editBtn.onclick = () => saveEdit(id, input.value);
  
  // Handle Enter key
  input.onkeypress = (e) => {
    if (e.key === 'Enter') {
      saveEdit(id, input.value);
    }
  };
}

async function saveEdit(id, newTitle) {
  if (!newTitle.trim()) {
    alert('Task cannot be empty');
    return;
  }
  await updateTask(id, { title: newTitle.trim() });
}

// Load tasks when page loads
window.onload = fetchTasks;
