import ToDo from "./models/toDo";
import ToDoServices from "./services/toDoServices";

const toDoServices = new ToDoServices();
function main() {
  console.log("Créer une tâche : ");
  const td1 = new ToDo("Ma première tâche", "tâche test", 2026, "prioritaire");
  console.log(toDoServices.createToDo(td1));
}

main();
