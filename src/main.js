import ToDoServices from "./services/toDoServices";
import ProjectServices from "./services/projectServices";

const toDoServices = new ToDoServices();
const projectServices = new ProjectServices();

function main() {
  console.log("Créer une tâche : ");

  toDoServices.createToDo({
    title: "Mon premier todo",
    description: "test",
    dueDate: "18 /10/2026",
    priority: "prioritaire",
  });

  toDoServices.createToDo({
    title: "Mon deuxième todo",
    description: "test",
    dueDate: "18 /10/2026",
    priority: "prioritaire",
  });

  console.log(toDoServices.getTodos());

  console.log("Créer un projet : ");

  projectServices.createProject("Project numéro 1");
  projectServices.addTask("Project numéro 1", {
    title: "Mon first todo dans un projet",
    description: "test",
    dueDate: "18 /10/2026",
    priority: "faible",
  });

  projectServices.createProject("Projet 2");
  projectServices.addTask("Projet 2", {
    title: "Mon deuxième todo dans un projet",
    description: "test",
    dueDate: "18 /10/2026",
    priority: "faible",
  });

  console.log(projectServices.getProjectTodos());
}

main();
