import PubSub from "pubsub-js";

class TodoHtmlView {
  constructor() {
    this.taskDialog = document.querySelector("#task-dialog");
    this.projectDialog = document.querySelector("#project-dialog");
    this.projectForm = document.querySelector("#project-form");
    this.taskForm = document.querySelector("#task-form");
    this.projectTitle = document.querySelector("#project-title");
    this.projectList = document.querySelector(".projects-list");
    this.taskTitle = document.querySelector("#task-title");
    this.taskDescription = document.querySelector("#description");
    this.taskDueDate = document.querySelector("#dueDate");
    this.taskPriority = document.querySelector("#priority-select");
    this.taskList = document.querySelector(".tasks-list");

    // EVENEMENTS POUR AFFICHER LES MODALS
    document
      .querySelector(".add-project")
      .addEventListener("click", () => this.projectDialog.showModal());

    document
      .querySelector(".add-task")
      .addEventListener("click", () => this.taskDialog.showModal());

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

    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitter = e.submitter;
      if (submitter.classList.contains("red")) {
        this.taskDialog.close();
        return;
      }

      PubSub.publish("adding_task", {
        title: this.taskTitle.value,
        description: this.taskDescription.value,
        dueDate: this.taskDueDate.value,
        priority: this.taskPriority.value,
      });
      this.taskForm.reset();
      this.taskDialog.close();
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

  renderTask(tasks) {
    this.taskList.innerHTML = "";

    tasks.forEach((task) => {
      const liContainer = document.createElement("div");
      const li = document.createElement("li");
      const taskTitleP = document.createElement("p");
      const taskDueDateP = document.createElement("p");

      taskTitleP.textContent = task.title;
      taskDueDateP.textContent = task.dueDate;

      liContainer.append(taskTitleP, taskDueDateP);
      liContainer.classList.add("content");
      li.appendChild(liContainer);
      this.taskList.appendChild(li);
    });
  }
}

export default TodoHtmlView;
