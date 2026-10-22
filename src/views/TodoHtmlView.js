import PubSub from "pubsub-js";

class TodoHtmlView {
  constructor() {
    this.taskDialog = document.querySelector("#task-dialog");
    this.projectDialog = document.querySelector("#project-dialog");
    this.projectForm = document.querySelector("#project-form");
    this.taskForm = document.querySelector("#task-form");
    this.projectTitle = document.querySelector("#project-title");
    this.projectList = document.querySelector(".projects-list");

    // EVENEMENTS POUR AFFICHER LES MODALS
    document
      .querySelector(".add-project")
      .addEventListener("click", () => this.projectDialog.showModal());

    document
      .querySelector(".add-task")
      .addEventListener("click", () => this.taskDialog.showModal());

    /*Ajouter un projet
    lorsque je clique sur bouton submit,
    je publie projet ajouter et j'envoie le titre du projet
    projectservices s'abonne à pojet ajouté, 
    il récupère le titre du projet
    et affiche le projet en bas
    */

    // EVENEMENTS SUR LES FORMULAIRES
    this.projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitter = e.submitter;
      if (submitter.classList.contains("red")) {
        this.projectDialog.close();
        return;
      }

      PubSub.publish("adding_project", { title: this.projectTitle.value });
      this.projectForm.reset();
      this.projectDialog.close();
    });
  }

  renderProject(projects) {
    this.projectList.innerHTML = "";
    projects.forEach((project) => {
      const li = document.createElement("li");
      li.classList.add("list", "classification-list");
      li.textContent = project.title;
      this.projectList.appendChild(li);
    });
  }
}

export default TodoHtmlView;
