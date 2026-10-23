import ToDo from "../models/toDo";
import PubSub from "pubsub-js";

class ToDoServices {
  constructor() {
    this.todos = [];

    PubSub.subscribe("adding_task", (topic, data) => {
      this.createToDo({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
      });
    });
  }

  createToDo({ title, description, dueDate, priority }) {
    const todo = new ToDo(title, description, dueDate, priority);
    this.todos.push(todo);

    PubSub.publish("task_added", this.todos);
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
