// 8. Organiser l'affichage des todo par jours, semaines, mois
//     je dois récupérer le jour exact qu'on est
//     Pour les todo par jour
//         je vérifie mes liste de todo, si la date de l'une est égale à la date d'aujourd'hui, j'affiche
//     Pour les todo par semaine
//         j'essaye de situer le date du jour dans un calendrier allant de lundi à dimanche
//         si la date d'une todo est dans cet interval, j'affiche
//     Pour les todo par mois
//         Je recupère le mois et l'année dans laquelle nous sommes
//         j'affiche tous les todo qui partagent le même mois et la même année

import { format } from "date-fns";

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
}

export default DisplayToDo;
