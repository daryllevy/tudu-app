import PubSub from "pubsub-js";

class TodoHtmlView {
  constructor() {
    this.taskDialog = document.querySelector("#task-dialog");
    this.projectDialog = document.querySelector("#project-dialog");
    this.projectForm = document.querySelector("#project-form");
    this.taskForm = document.querySelector("#task-form");
    this.taskFormTitle = this.taskForm.querySelector(".form-title");
    this.projectTitle = document.querySelector("#project-title");
    this.projectList = document.querySelector(".projects-list");
    this.isProjectTask = false;
    this.selectedProjectTitle = null;
    this.taskTitle = document.querySelector("#task-title");
    this.taskDescription = document.querySelector("#description");
    this.taskDueDate = document.querySelector("#dueDate");
    this.taskPriority = document.querySelector("#priority-select");
    this.taskList = document.querySelector(".tasks-list");
    this.contentTitle = document.querySelector(".content-title");
    this.classificationList = document.querySelector(
      ".classification-list-content",
    );

    // EVENEMENTS POUR AFFICHER LES MODALS
    document
      .querySelector(".add-project")
      .addEventListener("click", () => this.projectDialog.showModal());

    document.querySelector(".add-task").addEventListener("click", () => {
      this.editingTaskId = null;
      this.taskForm.reset();
      this.taskFormTitle.textContent = "New Task";
      this.taskDialog.showModal();
    });

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

      const taskData = {
        title: this.taskTitle.value,
        description: this.taskDescription.value,
        dueDate: this.taskDueDate.value,
        priority: this.taskPriority.value,
      };

      if (this.editingTaskId) {
        PubSub.publish("updating_task", {
          id: this.editingTaskId,
          data: taskData,
        });
        this.editingTaskId = null;
      } else if (this.isProjectTask) {
        PubSub.publish("adding_project_task", {
          projectTitle: this.selectedProjectTitle,
          taskData,
        });
      } else {
        PubSub.publish("adding_task", taskData);
      }

      this.taskForm.reset();
      this.taskFormTitle.textContent = "New Task";
      this.taskDialog.close();
    });

    this.projectList.addEventListener("click", (e) => {
      this.displayTitle(e);
      this.isProjectTask = true;
      this.selectedProjectTitle = e.target.textContent;
    });

    // EVENEMENTS SUR LA LISTE DE MENU
    this.classificationList.addEventListener("click", (e) => {
      this.displayTitle(e);
      this.isProjectTask = false;
      this.selectedProjectTitle = null;
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
      const deleteIcon = document.createElement("p");
      const div = document.createElement("div");

      taskTitleP.textContent = task.title;
      taskDueDateP.textContent = task.dueDate;
      deleteIcon.textContent = "🗑️";

      div.classList.add("flex");
      deleteIcon.classList.add("trash");
      div.append(taskDueDateP, deleteIcon);
      liContainer.append(taskTitleP, div);
      liContainer.classList.add("content");
      li.appendChild(liContainer);
      li.classList.add("task-list");
      li.addEventListener("click", (event) => {
        if (event.target.closest(".trash")) {
          PubSub.publish("delete_task", { title: task.title });
          return;
        }

        this.editingTaskId = task.id;
        this.taskTitle.value = task.title;
        this.taskDescription.value = task.description;
        this.taskDueDate.value = task.dueDate;
        this.taskPriority.value = task.priority;
        this.taskFormTitle.textContent = "Edit Task";
        this.taskDialog.showModal();
      });
      this.taskList.appendChild(li);
    });
  }

  // Affichage du titre par rapport au menu sélectionné
  displayTitle(event) {
    const target = event.target;

    this.contentTitle.innerHTML = "";
    this.contentTitle.textContent = target.textContent;
  }
}

export default TodoHtmlView;
