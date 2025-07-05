// --- TODO App Logic ---
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

function addTask(text) {
  const li = document.createElement("li");
  li.className = "task";

  li.innerHTML = `
    <span>${text}</span>
    <span class="status todo">Todo</span>
    <button onclick="toggleStatus(this)">✅</button>
    <button onclick="removeTask(this)">🗑️</button>
  `;

  taskList.appendChild(li);
}

function removeTask(btn) {
  const task = btn.parentElement;
  task.classList.add("slide-out");
  setTimeout(() => task.remove(), 300);
}

function toggleStatus(btn) {
  const task = btn.parentElement;
  const statusSpan = task.querySelector(".status");

  if (statusSpan.classList.contains("todo")) {
    statusSpan.textContent = "In Progress";
    statusSpan.className = "status in-progress";
  } else if (statusSpan.classList.contains("in-progress")) {
    statusSpan.textContent = "Complete";
    statusSpan.className = "status complete";
    task.classList.add("complete");
  } else {
    statusSpan.textContent = "Todo";
    statusSpan.className = "status todo";
    task.classList.remove("complete");
  }
}

// --- 🌙 Dark Mode Toggle Logic ---
const toggle = document.getElementById('modeToggle');

// Load saved mode from localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  toggle.checked = true;
}

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ Service Worker registered'))
      .catch(err => console.log('❌ SW Error:', err));
  });
}
