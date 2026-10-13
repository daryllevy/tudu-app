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
    const project = this.projects.find(
      (project) => project.title === projectTitle,
    );

    if (!project) return [];

    const newTodo = toDoServices.createToDo({
      title,
      description,
      dueDate,
      priority,
    });

    project.todos.push(newTodo);
  }

  deleteTask(projectTitle, taskTitle) {
    const project = this.projects.find(
      (prject) => prject.title === projectTitle,
    );

    if (project) {
      project.todos = project.todos.filter(
        (prject) => prject.title !== taskTitle,
      );
    }
  }

  deleteProject(projectTitle) {
    return (this.projects = this.projects.filter(
      (project) => project.title !== projectTitle,
    ));
  }

  getProjectTodos() {
    return this.projects;
  }
}

export default ProjectServices;
