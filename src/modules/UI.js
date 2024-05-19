import Storage from './Storage';
import TodoList from './TodoList';
import Task from './Task';
import Project from './Project';

// Event Listeners

const addTaskModal = document.querySelector('.add-task-modal');
const addTaskBtn = document.querySelector('.add-task');
const closeTaskModalBtn = document.querySelector('.add-task-modal .btn');

addTaskBtn.addEventListener('click', () => {
  addTaskModal.showModal();
});

closeTaskModalBtn.addEventListener('click', () => {
  addTaskModal.close();
});
