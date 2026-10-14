import { format, isSameWeek, toDate } from "date-fns";

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
}

export default DisplayToDo;
