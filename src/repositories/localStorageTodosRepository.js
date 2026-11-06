class LocalStorageTodosRepository {
  constructor() {
    this.todosKey = "todos_saved";
    this.projectsKey = "projects_saved";
  }

  loadTodos() {
    return this.load(this.todosKey);
  }

  saveTodos(todos) {
    this.save(this.todosKey, todos);
  }

  loadProjects() {
    return this.load(this.projectsKey);
  }

  saveProjects(projects) {
    this.save(this.projectsKey, projects);
  }

  load(key) {
    const savedData = localStorage.getItem(key);

    if (!savedData) return [];

    try {
      const data = JSON.parse(savedData);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export default LocalStorageTodosRepository;
