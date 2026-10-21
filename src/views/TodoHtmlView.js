class TodoHtmlView {
  constructor() {
    this.taskDialog = document.querySelector("#task-dialog");
    this.projectDialog = document.querySelector("#project-dialog");
    this.projectForm = document.querySelector("#project-form");
    this.taskForm = document.querySelector("#task-form");
    this.projectTitle = document.querySelector("#project-title");
    this.projectList = document.querySelector(".project-list");

    // EVENEMENTS POUR AFFICHER LES MODALS
    document
      .querySelector(".add-project")
      .addEventListener("click", () => this.projectDialog.showModal());

    document
      .querySelector(".add-task")
      .addEventListener("click", () => this.taskDialog.showModal());
  }
}

export default TodoHtmlView;
