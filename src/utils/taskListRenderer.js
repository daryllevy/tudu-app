function createTaskListRenderer({
  toDoServices,
  projectServices,
  displayTodo,
  view,
}) {
  function getInboxTasks() {
    const projectTasks = projectServices.projects.flatMap((project) =>
      project.todos.map((task) => ({ ...task, projectTitle: project.title })),
    );
    const inboxTasks = toDoServices.todos.map((task) => ({
      ...task,
      projectTitle: null,
    }));

    return [...inboxTasks, ...projectTasks];
  }

  return function renderCurrentTasks() {
    let tasks = [];

    if (view.currentSection === "Inbox") {
      tasks = getInboxTasks();
    } else if (view.currentSection === "Today") {
      tasks = displayTodo.filterByToday(getInboxTasks());
    } else if (view.currentSection === "This week") {
      tasks = displayTodo.filterByWeek(getInboxTasks());
    } else if (view.currentSection === "This month") {
      tasks = displayTodo.filterByMonth(getInboxTasks());
    } else if (view.currentSection === "project") {
      const project = projectServices.projects.find(
        (item) => item.title === view.selectedProjectTitle,
      );
      tasks = (project?.todos ?? []).map((task) => ({
        ...task,
        projectTitle: project.title,
      }));
    }

    view.renderTask(tasks);
  };
}

export default createTaskListRenderer;
