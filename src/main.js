import TodoHtmlView from "./views/TodoHtmlView";
import ToDoServices from "./services/toDoServices";
import ProjectServices from "./services/projectServices";
import DisplayToDo from "./utils/displayTodo";
import createTaskListRenderer from "./utils/taskListRenderer";
import PubSub from "pubsub-js";
import "./style.css";

const toDoServices = new ToDoServices();
const projectServices = new ProjectServices();
const displayTodo = new DisplayToDo();
const view = new TodoHtmlView();
const renderCurrentTasks = createTaskListRenderer({
  toDoServices,
  projectServices,
  displayTodo,
  view,
});

function main() {
  // Ajouter une tâche
  PubSub.subscribe("task_added", () => {
    renderCurrentTasks();
  });

  // Créer un projet
  PubSub.subscribe("project_added", (topic, projects) => {
    view.renderProject(projects);
  });

  // Supprimer une tâche
  PubSub.subscribe("task_deleted", () => {
    renderCurrentTasks();
  });

  // Ajouter une tâche à un projet
  PubSub.subscribe("project_task_added", () => {
    renderCurrentTasks();
  });

  // Publier les tâches déjà présente dans le projet
  PubSub.subscribe("project_tasks_loaded", () => {
    renderCurrentTasks();
  });

  // Supprimer une tâche dans un projet
  PubSub.subscribe("project_task_deleted", () => {
    renderCurrentTasks();
  });

  // Supprimer un projet
  PubSub.subscribe("project_deleted", (topic, data) => {
    view.renderProject(data.projects);
    renderCurrentTasks();
  });

  // Afficher toutes les tâches
  PubSub.subscribe("show_inbox", renderCurrentTasks);

  // Afficher les tâches d'aujourd'hui
  PubSub.subscribe("show_today", renderCurrentTasks);

  console.log("Afficher par semaine : ");

  console.log("Afficher par mois : ");
}

main();
