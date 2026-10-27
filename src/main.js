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

  // console.log("Supprimer une tâche dans un projet : ");
  // projectServices.deleteTask("Projet 2", "Mon deuxième todo dans un projet");
  // console.log(projectServices.getProjectTodos());

  // console.log("Supprimer un projet : ");
  // projectServices.deleteProject("Projet 2");
  // console.log(projectServices.getProjectTodos());

  console.log("Afficher les tâches d'aujoud'hui : ");
  console.log(displayTodo.filterByToday(toDoServices.getTodos()));
  console.log(displayTodo.filterByToday(projectServices.getProjectTodos()));

  console.log("Afficher par semaine : ");
  console.log(displayTodo.filterByWeek(toDoServices.getTodos()));
  console.log(displayTodo.filterByWeek(projectServices.getProjectTodos()));

  console.log("Afficher par mois : ");
  console.log(displayTodo.filterByMonth(toDoServices.getTodos()));
  console.log(displayTodo.filterByMonth(projectServices.getProjectTodos()));
}

main();
