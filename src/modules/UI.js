import Storage from './Storage';
import TodoList from './TodoList';
import Task from './Task';
import Project from './Project';

let todo = new TodoList();
todo.addProject(new Project('helo'));

todo.addProject(new Project('manoj'));

// console.log(todo);

Storage.saveTodoList(todo);

console.log(localStorage);
todo.deleteProject('manoj');

console.log(Storage.getTodoList());
