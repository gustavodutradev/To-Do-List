const taskButton = document.querySelector('#criar-tarefa');
const clearAllButton = document.querySelector('#apaga-tudo');
const clearCompletedButton = document.querySelector('#remover-finalizados');
const saveTasks = document.querySelector('#salvar-tarefas');
const taskList = document.querySelector('#lista-tarefas');
const taskInput = document.querySelector('#texto-tarefa');
const savedTasksList = document.querySelector('.saved-tasks-list');

// Cria função para criar tarefa e adicionar cada tarefa na lista quando clicar no botão

taskButton.addEventListener('click', () => {
  if (taskInput.value !== '') {
    const task = document.createElement('li');
    task.classList = 'tarefa';
    task.classList.add('list-group-item');
    task.innerText = taskInput.value;
    taskList.appendChild(task);
    taskInput.value = '';
  } else {
    alert('Digite uma tarefa!');
  }
});

// Cria função que pinta o fundo da tarefa quando clicar no texto da tarefa

taskList.addEventListener('click', ({ target }) => {
  const checkClass = target.classList.contains('selecionada');
  if (checkClass) {
    target.classList.remove('selecionada');
  } else {
    target.classList.add('selecionada');
  }
});

// Função que adiciona estilo a tarefa concluida e a remove após duplo clique

taskList.addEventListener('dblclick', ({ target }) => {
  if (target.classList.contains('completed')) {
    target.remove();
  } else {
    target.style.textDecoration = 'line-through solid black';
    target.classList.add('completed');
  }
});

// Cria evento que limpa tarefas quando clicado

clearAllButton.addEventListener('click', () => {
  taskList.innerHTML = '';
});

// Cria evento que limpa tarefas concluídas quando clicado

clearCompletedButton.addEventListener('click', () => {
  const completedTasks = document.querySelectorAll('.completed');
  completedTasks.forEach((task) => task.remove());
});

// Cria evento que salva tarefas selecionadas quando clicado

saveTasks.addEventListener('click', () => {
  const savedTasksArray = [];
  const selectedTasks = document.querySelectorAll('.selecionada');

  selectedTasks.forEach((task) => savedTasksArray.push(task.innerText));
  localStorage.setItem('savedTasks', JSON.stringify([...savedTasksArray]));
});

// Cria evento que adiciona tarefa salva quando clicado

saveTasks.addEventListener('click', () => {
  const savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
  savedTasks.forEach((task) => {
    const savedTask = document.createElement('li');
    savedTasksList.appendChild(savedTask);
    savedTask.classList = 'saved-task';
    savedTask.classList.add('list-group-item');
    savedTask.innerText = task;
  });
  const taskToRemove = document.querySelector('.selecionada');
  const taskToRemoveParent = taskToRemove.parentNode;
  taskToRemoveParent.removeChild(taskToRemove);
});
