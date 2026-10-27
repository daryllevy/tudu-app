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

    PubSub.subscribe("delete_task", (topic, data) => {
      this.deleteTodo(data.title);
    });
  }

  createToDo({ title, description, dueDate, priority }) {
    const todo = new ToDo(title, description, dueDate, priority);
    this.todos.push(todo);

    PubSub.publish("task_added", this.todos);
  }

  updateToDo(todoId, data) {
    const todo = this.todos.find((task) => task.id === todoId);

    if (todo) {
      Object.assign(todo, data);
      PubSub.publish("task_added", this.todos);
    }
  }

  deleteTodo(todoTitle) {
    this.todos = this.todos.filter((todo) => todo.title !== todoTitle);
    PubSub.publish("task_deleted", this.todos);
  }

  getTodos() {
    return this.todos;
  }
}

export default ToDoServices;
