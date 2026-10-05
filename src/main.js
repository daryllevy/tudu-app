import ToDoServices from "./services/toDoServices";

const toDoServices = new ToDoServices();
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
}

main();
