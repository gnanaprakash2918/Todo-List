import Storage from './Storage';
import TodoList from './TodoList';
import Task from './Task';
import Project from './Project';

// Event Listeners

const modalOverlay = document.querySelector('.overlay');
const addTaskModal = document.querySelector('.add-task-modal');
const addTaskBtn = document.querySelector('.add-task');
const closeTaskModalBtn = document.querySelector('.task-close-btn');

addTaskBtn.addEventListener('click', () => {
  modalOverlay.classList.add('bg');
});

closeTaskModalBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('bg');
});
