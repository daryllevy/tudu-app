import ToDoServices from "./toDoServices";
import Project from "../models/Project";
import Pubsub from "pubsub-js";

const toDoServices = new ToDoServices();

class ProjectServices {
  constructor() {
    this.projects = [];

    Pubsub.subscribe("adding_project", (topic, data) => {
      this.createProject(data.title);
    });
  }

  createProject(title) {
    const projectTitle = new Project(title);
    this.projects.push(projectTitle);

    Pubsub.publish("project_added", this.projects);
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
