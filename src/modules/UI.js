import Storage from './Storage';
import TodoList from './TodoList';
import Task from './Task';
import Project from './Project';

// Event Listeners

const modalOverlay = document.querySelector('.overlay');
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

  const closeModal = () => {
    modalOverlay.classList.remove('bg');
    modalOverlay.innerHTML = '';
  };

  closeTaskModalBtn.addEventListener('click', () => {
    closeModal();
    closeTaskModalBtn.removeEventListener('click', closeModal);
  });
});
