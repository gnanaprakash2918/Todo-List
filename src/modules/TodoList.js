import Project from './Project';
import Task from './Task';

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('Home'));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => {
      console.log(project.getName().trim(), projectName.trim());
      return project.getName().trim() === projectName.trim();
    });
  }

  contains(projectName) {
    return this.projects.some(
      (project) => project.getName().trim() === projectName.trim()
    );
  }

  addProject(newProject) {
    if (this.contains(newProject.getName())) return;
    this.projects.push(newProject);
  }

  deleteProject(projectName) {
    if (!this.contains(projectName)) return;
    this.projects = this.projects.filter(
      (project) => project.getName().trim() !== projectName.trim()
    );
  }
}
