import ToDoServices from "./services/toDoServices";
import ProjectServices from "./services/projectServices";
import DisplayToDo from "./utils/displayTodo";

const toDoServices = new ToDoServices();
const projectServices = new ProjectServices();
const displayTodo = new DisplayToDo();

function main() {
  console.log("Créer une tâche : ");

  toDoServices.createToDo({
    title: "Mon premier todo",
    description: "test",
    dueDate: "2026-11-13",
    priority: "prioritaire",
  });

  toDoServices.createToDo({
    title: "Mon deuxième todo",
    description: "test",
    dueDate: "2026-10-12",
    priority: "prioritaire",
  });

  console.log(toDoServices.getTodos());

  console.log("Modifier une tâche : ");
  toDoServices.modifyTodo("Mon deuxième todo", "description", "test modifié");

  console.log(toDoServices.getTodos());

  console.log("Créer un projet : ");

  projectServices.createProject("Project numéro 1");
  projectServices.addTask("Project numéro 1", {
    title: "Mon first todo dans un projet",
    description: "test",
    dueDate: "2026-10-14",
    priority: "faible",
  });

  projectServices.createProject("Projet 2");
  projectServices.addTask("Projet 2", {
    title: "Mon deuxième todo dans un projet",
    description: "test",
    dueDate: "2026-10-19",
    priority: "faible",
  });

  console.log(projectServices.getProjectTodos());

  // console.log("Supprimer une tâche : ");
  // toDoServices.deleteTodo("Mon deuxième todo");
  // console.log(toDoServices.getTodos());

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
}

main();
