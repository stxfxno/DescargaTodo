// Referencias a los elementos HTML
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', loadTasks);

// Agregar nueva tarea
function addTask() {
  const taskText = document.getElementById('taskInput').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const taskTag = document.getElementById('taskTag').value.trim();
  if (taskText === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    dueDate: dueDate,
    tag: taskTag,
    completed: false,
  };

  saveTask(task);
  loadTasks();
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}


// Guardar tarea en localStorage
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Obtener tareas de localStorage
function getTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Cargar y mostrar tareas
function loadTasks() {
  const tasks = getTasks();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add('completed');
    }
    
    // Marcar tarea como completada al hacer click
    li.addEventListener('click', () => toggleTaskCompletion(task.id));

    // Botón para eliminar tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();  // Evita que se active el evento de marcar completado
      deleteTask(task.id);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Marcar tarea como completada
function toggleTaskCompletion(taskId) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

// Eliminar tarea
function deleteTask(taskId) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function assignTaskToDate() {
  const date = document.getElementById('calendarInput').value;
  const tasks = getTasks();
  const task = tasks.find(task => task.dueDate === date);
  if (task) {
    document.getElementById('taskCalendar').innerHTML = `Tarea: ${task.text}`;
  }
}

function addGoal() {
  const goalText = document.getElementById('goalInput').value.trim();
  const deadline = document.getElementById('goalDeadline').value;
  if (goalText === '') return;

  const goal = {
    id: Date.now(),
    text: goalText,
    deadline: deadline,
    progress: 0,
  };

  saveGoal(goal);
}

function saveGoal(goal) {
  const goals = getGoals();
  goals.push(goal);
  localStorage.setItem('goals', JSON.stringify(goals));
}

function getGoals() {
  const goals = localStorage.getItem('goals');
  return goals ? JSON.parse(goals) : [];
}

function addChecklistItem() {
  const itemText = document.getElementById('checklistInput').value.trim();
  if (itemText === '') return;

  const item = {
    id: Date.now(),
    text: itemText,
    completed: false,
  };

  saveChecklistItem(item);
  loadChecklist();
}

function saveChecklistItem(item) {
  const checklist = getChecklist();
  checklist.push(item);
  localStorage.setItem('checklist', JSON.stringify(checklist));
}

function getChecklist() {
  const checklist = localStorage.getItem('checklist');
  return checklist ? JSON.parse(checklist) : [];
}


let pomodoroInterval;
let seconds = 25 * 60;

function startPomodoro() {
  if (pomodoroInterval) clearInterval(pomodoroInterval);

  pomodoroInterval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(pomodoroInterval);
      alert("Pomodoro completado");
      seconds = 25 * 60;  // Resetear el temporizador
    } else {
      seconds--;
      document.getElementById('pomodoroTimer').textContent = formatTime(seconds);
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


function setReminders() {
  const tasks = getTasks();
  tasks.forEach(task => {
    const taskDueDate = new Date(task.dueDate).getTime();
    const currentTime = Date.now();
    const timeToReminder = taskDueDate - currentTime - 60000;  // 1 minuto antes del vencimiento

    if (timeToReminder > 0) {
      setTimeout(() => {
        alert(`Recordatorio: La tarea "${task.text}" está por vencer`);
      }, timeToReminder);
    }
  });
}

setReminders();


function generateProgressReport() {
  const tasks = getTasks();
  const goals = getGoals();

  let completedTasks = tasks.filter(task => task.completed).length;
  let totalTasks = tasks.length;

  let completedGoals = goals.filter(goal => goal.progress === 100).length;
  let totalGoals = goals.length;

  alert(`Informe de progreso:\n\nTareas completadas: ${completedTasks} de ${totalTasks}\nMetas completadas: ${completedGoals} de ${totalGoals}`);
}

generateProgressReport();
