import { format, isSameMonth, isSameWeek, toDate } from "date-fns";

class DisplayToDo {
  filterByToday(todos) {
    const today = format(new Date(), "yyyy-MM-dd");

    if (Array.isArray(todos)) {
      return todos.filter((todo) => {
        if (Array.isArray(todo.todos)) {
          return todo.todos.some((task) => task.dueDate === today);
        }

        return todo.dueDate === today;
      });
    }

    return [];
  }

  filterByWeek(todos) {
    const today = toDate(format(new Date(), "yyyy-MM-dd"));

    return todos.filter((todo) => {
      if (Array.isArray(todo.todos)) {
        return todo.todos.some((task) =>
          isSameWeek(today, toDate(task.dueDate), { weekStartsOn: 1 }),
        );
      }

      return isSameWeek(today, toDate(todo.dueDate), {
        weekStartsOn: 1,
      })
        ? todo
        : false;
    });
  }

  //     Pour les todo par mois
  //         Je recupère le mois et l'année dans laquelle nous sommes
  //         j'affiche tous les todo qui partagent le même mois et la même année

  filterByMonth(todos) {
    const today = toDate(format(new Date(), "yyyy-MM-dd"));

    if (todos.length > 0 && Array.isArray(todos[0].todos)) {
      return todos
        .map((project) => {
          const tasksOfMonth = project.todos.filter((task) =>
            isSameMonth(today, toDate(task.dueDate)),
          );

          return { ...project, todos: tasksOfMonth }; // retourne le projet et les tâches du mois triées
        })
        .filter((project) => project.todos.length > 0); // enlève les projets dont la liste filtrée est vide
    }

    return todos.filter((todo) => isSameMonth(today, toDate(todo.dueDate)));
  }
}

export default DisplayToDo;
