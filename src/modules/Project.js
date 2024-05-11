import { format, isEqual } from 'date-fns';
export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  // Name
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // Tasks
  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  // Single Task
  getTask(taskName) {
    return this.tasks.find((task) => {
      task.getName() === taskName;
    });
  }

  contains(taskName) {
    return this.tasks.some((task) => task.getName() === taskName);
  }

  addTask(newTask) {
    if (this.contains(newTask.getName())) return;
    this.tasks.push(newTask);
  }

  deleteTask(taskName) {
    if (!this.contains(newTask.getName())) return;
    this.tasks = this.tasks.filter((task) => {
      return task.getName() !== taskName;
    });
  }

  getTasksByDate(date = new Date()) {
    return this.tasks.filter((task) => {
      const taskDate = toDate(new Date(task.getDateFormatted()));
      return isEqual(taskDate, date);
    });
  }
}
