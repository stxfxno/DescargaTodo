// Ejemplo de tareas iniciales
let tasks = [
  {
    fechaSubida: '2025-01-01',
    titulo: 'Estudiar JS',
    categoria: 'Educación',
    fechaLimite: '2025-01-10',
    descripcion: 'Repasar conceptos avanzados de JS.',
    hecho: false
  },
  {
    fechaSubida: '2025-01-02',
    titulo: 'Comprar comida',
    categoria: 'Compras',
    fechaLimite: '2025-01-03',
    descripcion: 'Ir al supermercado.',
    hecho: true
  }
];

// Función para mostrar las tareas en la tabla
function displayTasks() {
  const tableBody = document.querySelector("#taskTable tbody");
  tableBody.innerHTML = '';

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${task.fechaSubida}</td>
      <td>${task.titulo}</td>
      <td>${task.categoria}</td>
      <td>${task.fechaLimite}</td>
      <td>${task.descripcion}</td>
      <td><input type="checkbox" ${task.hecho ? 'checked' : ''} onclick="toggleDone(${index})"></td>
      <td><button class="delete" onclick="deleteTask(${index})">Eliminar</button></td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Función para marcar la tarea como hecha o no
function toggleDone(index) {
  tasks[index].hecho = !tasks[index].hecho;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
  tasks.splice(index, 1);  // Eliminar la tarea del arreglo
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Actualizar el localStorage
  displayTasks();  // Volver a mostrar la tabla
}

// Función para mostrar el formulario para agregar tarea
document.getElementById('addButton').addEventListener('click', () => {
  document.getElementById('addTaskForm').style.display = 'block';
});

// Función para cancelar la creación de tarea
document.getElementById('cancelButton').addEventListener('click', () => {
  document.getElementById('addTaskForm').style.display = 'none';
});

// Función para agregar una nueva tarea
document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const newTask = {
    fechaSubida: new Date().toISOString().split('T')[0], // Fecha actual
    titulo: document.getElementById('titulo').value,
    categoria: document.getElementById('categoria').value,
    fechaLimite: document.getElementById('fechaLimite').value,
    descripcion: document.getElementById('descripcion').value,
    hecho: false
  };

  tasks.push(newTask); // Agregar la nueva tarea al arreglo
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar en localStorage
  displayTasks();  // Volver a mostrar la tabla

  // Limpiar el formulario y ocultarlo
  document.getElementById('taskForm').reset();
  document.getElementById('addTaskForm').style.display = 'none';
});

// Cargar las tareas desde el almacenamiento local (si existen)
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

displayTasks();
