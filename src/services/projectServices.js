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

    PubSub.subscribe("project_selected", (topic, projectTitle) => {
      const project = this.projects.find((item) => item.title === projectTitle);
      if (project) PubSub.publish("project_tasks_loaded", project.todos); // Publie les tâches qui étaient déjà enregistrées
    });

    PubSub.subscribe("delete_project_task", (topic, data) => {
      this.deleteTask(data.projectTitle, data.taskId);
    });

    PubSub.subscribe("deleting_project", (topic, projectTitle) => {
      this.deleteProject(projectTitle);
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

  deleteTask(projectTitle, taskId) {
    const project = this.projects.find((item) => item.title === projectTitle);

    if (project) {
      project.todos = project.todos.filter((task) => task.id !== taskId);
      PubSub.publish("project_task_deleted", project.todos);
    }
  }

  deleteProject(projectTitle) {
    this.projects = this.projects.filter(
      (project) => project.title !== projectTitle,
    );
    PubSub.publish("project_deleted", { projects: this.projects, projectTitle });
  }
}

export default ProjectServices;
