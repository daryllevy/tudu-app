import ToDoServices from "./toDoServices";
import Project from "../models/Project";

const toDoServices = new ToDoServices();

class ProjectServices {
  constructor() {
    this.projects = [];
  }

  createProject(title) {
    const toDoTitle = new Project(title);
    this.projects.push(toDoTitle);

    return toDoTitle;
  }

  addTask(projectTitle, { title, description, dueDate, priority }) {
    const newTodo = toDoServices.createToDo({
      title,
      description,
      dueDate,
      priority,
    });

    const theTitle = projectTitle;

    const project = this.projects.find((project) => project.title === theTitle);
    project ? project.todos.push(newTodo) : [];
  }

  getProjectTodos() {
    return this.projects;
  }
}

export default ProjectServices;
