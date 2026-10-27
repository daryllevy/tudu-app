import ToDoServices from "./toDoServices";
import Project from "../models/Project";
import PubSub from "pubsub-js";

const toDoServices = new ToDoServices();

class ProjectServices {
  constructor() {
    this.projects = [];

    PubSub.subscribe("adding_project", (topic, data) => {
      this.createProject(data.title);
    });

    PubSub.subscribe("adding_project_task", (topic, data) => {
      this.addTask(data.projectTitle, data.taskData);
    });
  }

  createProject(title) {
    const projectTitle = new Project(title);
    this.projects.push(projectTitle);

    PubSub.publish("project_added", this.projects);
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
    PubSub.publish("project_task_added", project.todos);
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
}

export default ProjectServices;
