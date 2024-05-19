import Storage from './Storage';
import TodoList from './TodoList';
import Task from './Task';
import Project from './Project';

// Event Listeners

const modalOverlay = document.querySelector('.overlay');

const closeModal = () => {
  modalOverlay.classList.remove('bg');
  modalOverlay.innerHTML = '';
};

const addTaskBtn = document.querySelector('.add-task');
addTaskBtn.addEventListener('click', () => {
  modalOverlay.classList.add('bg');
  modalOverlay.innerHTML = `
                <div class="add-task-modal modal">
                <!-- <label for="task-name">Task Name</label> -->
                <input
                type="text"
                name="task-name"
                id="task-name"
                placeholder="Enter Task Name"
                required
                />
                <!-- <label for="task-desc">Description</label> -->
                <input
                type="text"
                name="task-desc"
                id="task-desc"
                placeholder="Task Description"
                />
                <!-- <label for="task-notes">Notes</label> -->
                <textarea
                name="task-notes"
                id="task-notes"
                placeholder="Task Notes"
                ></textarea>
                <!-- <label for="due-date">Due Date</label> -->
                <input
                type="text"
                id="due-date"
                name="due-date"
                placeholder="Due Date"
                onfocus="this.type = 'date'"
                onblur="this.type = 'text'"
                />
                <!-- <label for="priority">Task Priority</label> -->
                <select name="priority" id="priority">
                <option value="" disabled selected>Select Priority</option>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                </select>
                <button class="task-add-btn btn">Add</button>
                <button class="task-close-btn btn">Close</button>
                </div>
  `;

  const addTaskModal = document.querySelector('.add-task-modal');
  const closeTaskModalBtn = document.querySelector('.task-close-btn');

  closeTaskModalBtn.addEventListener('click', () => {
    closeModal();
    closeTaskModalBtn.removeEventListener('click', closeModal);
  });
});

const addProjectBtn = document.querySelector('.add-project-btn');
addProjectBtn.addEventListener('click', () => {
  modalOverlay.classList.add('bg');
  modalOverlay.innerHTML = `
            <div class="add-project-modal modal">
            <!-- <label for="task-name">Task Name</label> -->
            <input
              type="text"
              name="project-name"
              id="project-name"
              placeholder="Enter Project Name"
              required
            />
            <button class="project-add-btn btn">Add</button>
            <button class="project-close-btn btn">Close</button>
          </div>
  `;

  const addProjectModal = document.querySelector('.project-add-btn');
  const closeProjectModal = document.querySelector('.project-close-btn');

  closeProjectModal.addEventListener('click', () => {
    closeModal();
    closeProjectModal.removeEventListener('click', closeModal);
  });
});
