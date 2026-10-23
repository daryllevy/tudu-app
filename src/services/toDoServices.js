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

    PubSub.subscribe("updating_task", (topic, { id, data }) => {
      this.updateToDo(id, data);
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

  updateToDo(todoId, data) {
    const todo = this.todos.find((task) => task.id === todoId);

    if (todo) {
      Object.assign(todo, data);
      PubSub.publish("task_added", this.todos);
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
