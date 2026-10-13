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

  modifyTodo(todoTitle, data, modifier) {
    const exists = this.todos.find((td) => td.title === todoTitle);

    if (exists) {
      return (exists[data] = modifier);
    }
  }

  deleteTodo(todoTitle) {
    return (this.todos = this.todos.filter((todo) => todo.title !== todoTitle));
  }

  getTodos() {
    return this.todos;
  }
}

export default ToDoServices;
