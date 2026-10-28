import ToDoServices from "./services/toDoServices";
import ProjectServices from "./services/projectServices";
import DisplayToDo from "./utils/displayTodo";
import TodoHtmlView from "./views/TodoHtmlView";
import PubSub from "pubsub-js";
import "./style.css";

const toDoServices = new ToDoServices();
const projectServices = new ProjectServices();
const displayTodo = new DisplayToDo();
const view = new TodoHtmlView();

function main() {
  // Ajouter une tâche
  PubSub.subscribe("task_added", (topic, tasks) => {
    view.renderTask(tasks);
  });

  // Créer un projet
  PubSub.subscribe("project_added", (topic, projects) => {
    view.renderProject(projects);
  });

  // Supprimer une tâche
  PubSub.subscribe("task_deleted", (topic, tasks) => {
    view.renderTask(tasks);
  });

  // Ajouter une tâche à un projet
  PubSub.subscribe("project_task_added", (topic, tasks) => {
    view.renderTask(tasks);
  });

  // Publier les tâches déjà présente dans le projet
  PubSub.subscribe("project_tasks_loaded", (topic, tasks) => {
    view.renderTask(tasks);
  });

  // Supprimer une tâche dans un projet
  PubSub.subscribe("project_task_deleted", (topic, tasks) => {
    view.renderTask(tasks);
  });

  // Supprimer un projet
  PubSub.subscribe("project_deleted", (topic, data) => {
    view.renderProject(data.projects);
  });

  console.log("Afficher les tâches d'aujoud'hui : ");

  console.log("Afficher par semaine : ");

  console.log("Afficher par mois : ");
}

main();
