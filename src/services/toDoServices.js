import ToDo from "../models/toDo";

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
