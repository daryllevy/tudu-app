// 1. créer un todo
//     Je dois stocker la liste des todos
//     je créer la fonction créer un todo :
//     elle prend en paramètre un objet todo
//     je déstructure les propriétés de l'objet todo
//     je les ajoute dans un nouveau objet
//     et j'ajoute cette objet à mon tableaux de todos

const todos = [];
class ToDoServices {
  createToDo(data) {
    const { title, description, dueDate, priority } = data;

    const newTodo = {
      title,
      description,
      dueDate,
      priority,
    };

    todos.push(newTodo);

    return newTodo;
  }
}

export default ToDoServices;
