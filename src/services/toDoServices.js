import ToDo from "../models/toDo";
import PubSub from "pubsub-js";

class ToDoServices {
  constructor(repository) {
    this.repository = repository;
    this.todos = this.repository.loadTodos();

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
      this.deleteTodo(data.id);
    });
  }

  createToDo({ title, description, dueDate, priority }) {
    const todo = new ToDo(title, description, dueDate, priority);
    this.todos.push(todo);
    this.repository.saveTodos(this.todos);

    PubSub.publish("task_added", this.todos);
    return todo;
  }

  updateToDo(todoId, data) {
    const todo = this.todos.find((task) => task.id === todoId);

    if (todo) {
      Object.assign(todo, data);
      this.repository.saveTodos(this.todos);
      PubSub.publish("task_added", this.todos);
    }
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.repository.saveTodos(this.todos);
    PubSub.publish("task_deleted", this.todos);
  }
}

export default ToDoServices;
