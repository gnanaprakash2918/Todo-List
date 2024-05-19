import Storage from './Storage';
import TodoList from './TodoList';
import Task from './Task';
import Project from './Project';

const todoList = new TodoList();
// Event Listeners

const modalOverlay = document.querySelector('.overlay');

const closeModal = () => {
  modalOverlay.classList.remove('bg');
  modalOverlay.innerHTML = '';
};

function createProjectElement(project) {
  const element = document.createElement('div');
  element.classList.add('home-btn', 'btn');

  const imgElement = document.createElement('img');
  imgElement.src = './Images/ham-menu-icon.png';
  imgElement.alt = 'hamburger-menu-icon';

  const spanElement = document.createElement('span');
  spanElement.innerHTML = `${project.getName()}`;

  element.appendChild(imgElement);
  element.appendChild(spanElement);

  // event listener

  return element;
}

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
                <button class="task-add-btn btn" type="submit">Add</button>
                <button class="task-close-btn btn">Close</button>
                </div>
  `;

  const addTaskModal = document.querySelector('.task-add-btn');
  const closeTaskModalBtn = document.querySelector('.task-close-btn');

  addTaskModal.addEventListener('click', () => {
    const taskName = document.querySelector('#task-name');
    const taskDesc = document.querySelector('#task-desc');
    const taskNotes = document.querySelector('#task-notes');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('#priority').value;

    if (taskName.value.trim() === '') {
      taskName.reportValidity();
      console.log(taskName);
      return;
    }

    let newTask = new Task(
      taskName.value.trim(),
      dueDate.value.trim(),
      taskDesc.value.trim(),
      taskNotes.value.trim(),
      false,
      priority.value
    );

    // Get Project idx
    const projName = 'Inbox';
    const project = todoList.getProject(projName);

    if (project) {
      project.addTask(newTask);
      console.log(todoList.getProject(projName));
      console.log();
      closeModal();
    }
  });

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

  addProjectModal.addEventListener('click', () => {
    const projectName = document.querySelector('#project-name');

    if (projectName.value.trim() === '') {
      projectName.reportValidity();
      console.log(projectName);
      return;
    }

    let newProject = new Project(projectName.value.trim());

    if (newProject) {
      todoList.addProject(newProject);

      const element = createProjectElement(newProject);
      element.addEventListener('click', () => {
        const currProjTitle = document.querySelector('.right-side-panel h1');
        currProjTitle.innerText = newProject.getName();
      });

      document.querySelector('.projects-section').appendChild(element);
      closeModal();
    }
  });

  closeProjectModal.addEventListener('click', () => {
    closeModal();
    closeProjectModal.removeEventListener('click', closeModal);
  });
});

const homeProject = document.querySelector('.default-project');
homeProject.addEventListener('click', () => {
  const currProjTitle = document.querySelector('.right-side-panel h1');
  currProjTitle.innerText = 'Home';
});
