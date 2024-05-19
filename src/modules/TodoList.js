import Project from './Project';
import Task from './Task';

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('Inbox'));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  contains(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  addProject(newProject) {
    if (this.contains(newProject.getName())) return;
    this.projects.push(newProject);
  }

  deleteProject(projectName) {
    if (!this.contains(projectName)) return;
    this.projects = this.projects.filter(
      (project) => project.getName() !== projectName
    );
  }
}
