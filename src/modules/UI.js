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

function clearTasksList() {
  const tasksList = document.querySelector('.tasks-list');
  while (tasksList.childNodes.length > 1) {
    tasksList.removeChild(tasksList.lastChild);
  }
}

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

function createTaskElement(task) {
  const div = document.createElement('div');
  div.classList.add('btn', 'task-element');

  const left = document.createElement('div');
  left.classList.add('task-element-left');

  const right = document.createElement('div');
  right.classList.add('task-element-right');

  const nameDiv = document.createElement('div');
  const nameSpan = document.createElement('span');
  nameSpan.innerText = `Task : ${task.getName()}`;
  nameDiv.appendChild(nameSpan);
  left.appendChild(nameDiv);

  const descDiv = document.createElement('div');
  const descSpan = document.createElement('span');
  descSpan.innerText = `Description : ${task.getDescription()}`;
  descDiv.appendChild(descSpan);
  left.appendChild(descDiv);

  const noteDiv = document.createElement('div');
  const noteSpan = document.createElement('span');
  noteSpan.innerText = `Notes : ${task.getNote()}`;
  noteDiv.appendChild(noteSpan);
  left.appendChild(noteDiv);

  const dueDiv = document.createElement('div');
  const dueSpan = document.createElement('span');
  dueSpan.innerText = `Due Date : ${task.getDate()}`;
  dueDiv.appendChild(dueSpan);
  right.appendChild(dueDiv);

  const completionDiv = document.createElement('div');
  const completionSpan = document.createElement('span');
  completionSpan.innerText = `Completion Status : Not Completed`;
  completionDiv.appendChild(completionSpan);
  right.appendChild(completionDiv);

  const priorityDiv = document.createElement('div');
  const prioritySpan = document.createElement('span');
  prioritySpan.innerText = `Priority : ${task.getPriority()}`;
  priorityDiv.appendChild(prioritySpan);
  right.appendChild(priorityDiv);

  const last = document.createElement('div');
  const completedBtn = document.createElement('button');
  completedBtn.innerText = 'Mark Complete';
  completedBtn.classList.add('status-btn', 'btn');

  completedBtn.addEventListener('click', () => {
    const getTask = document.querySelector(
      '.task-element-left:first-child:first-child'
    ).firstChild;

    const taskName = getTask.innerText;
    const taskList = Array.from(document.querySelectorAll('.task-element'));

    for (let t = 0; t < taskList.length; ++t) {
      const currName = taskList[t].querySelector(
        '.task-element-left:first-child:first-child'
      ).firstChild.innerText;

      console.log(currName, taskName);
      if (currName === taskName) {
        taskList[t].remove();
        Storage.deleteTask(
          document.querySelector('div.right-side-panel > h1').innerText,
          currName.substring(7)
        );
        return;
      }
    }
  });

  last.appendChild(completedBtn);

  div.appendChild(left);
  div.appendChild(right);
  div.appendChild(last);

  return div;
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
    const priority = document.querySelector('#priority');

    if (taskName.value.trim() === '') {
      taskName.reportValidity();
      return;
    }

    if (priority.value.trim() === '') priority.value = '2';

    let newTask = new Task(
      taskName.value.trim(),
      dueDate.value.trim(),
      taskDesc.value.trim(),
      taskNotes.value.trim(),
      false,
      priority.value.trim()
    );

    const currProjTitle = document.querySelector(
      '.right-side-panel h1'
    ).innerText;

    const project = todoList.getProject(currProjTitle);

    if (project) {
      project.addTask(newTask);
      const element = createTaskElement(newTask);

      const projectContainer = document.querySelector('.tasks-list');
      projectContainer.appendChild(element);

      Storage.addTask(currProjTitle, newTask);
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
      return;
    }

    let newProject = new Project(projectName.value.trim());

    if (newProject) {
      todoList.addProject(newProject);

      const element = createProjectElement(newProject);

      element.addEventListener('click', () => {
        clearTasksList();
        const currProjTitle = document.querySelector('.right-side-panel h1');
        currProjTitle.innerText = newProject.getName();

        const tasksList = document.querySelector('.tasks-list');

        const obj = JSON.parse(localStorage.getItem('todoList'));

        const project = obj.projects.find(
          (p) => p.name === currProjTitle.innerText
        )['tasks'];

        if (!(Array.isArray(project) && project.length)) {
          return;
        }

        for (let i = 0; i < project.length; ++i) {
          const element = new Task(
            project[i]['name'],
            project[i]['dueDate'],
            project[i]['description'],
            project[i]['note'],
            project[i]['completionStatus'],
            project[i]['priority']
          );

          const currTask = createTaskElement(element);
          tasksList.appendChild(currTask);
        }
      });

      document.querySelector('.projects-section').appendChild(element);
      closeModal();

      Storage.addProject(newProject);
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
  clearTasksList();

  const tasksList = document.querySelector('.tasks-list');
  const obj = JSON.parse(localStorage.getItem('todoList'));

  const project = obj.projects.find((p) => p.name === currProjTitle.innerText)[
    'tasks'
  ];

  if (!(Array.isArray(project) && project.length)) {
    return;
  }

  for (let i = 0; i < project.length; ++i) {
    const element = new Task(
      project[i]['name'],
      project[i]['dueDate'],
      project[i]['description'],
      project[i]['note'],
      project[i]['completionStatus'],
      project[i]['priority']
    );

    const currTask = createTaskElement(element);
    tasksList.appendChild(currTask);
  }
});
