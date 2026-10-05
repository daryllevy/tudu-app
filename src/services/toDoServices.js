import ToDo from "../models/toDo";
// 1. créer un todo
//     Je dois stocker la liste des todos
//     je créer la fonction créer un todo :
//     elle prend en paramètre un objet todo
//     je déstructure les propriétés de l'objet todo
//     je les ajoute dans un nouveau objet
//     et j'ajoute cette objet à mon tableaux de todos

class ToDoServices {
  constructor() {
    this.todos = [];
  }
  createToDo({ title, description, dueDate, priority }) {
    const todo = new ToDo(title, description, dueDate, priority);
    this.todos.push(todo);

    return todo;
  }
  getTodos() {
    return this.todos;
  }
}

export default ToDoServices;
