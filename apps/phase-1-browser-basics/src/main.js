import { renderApp, renderTaskResults } from "./render.js";
import {
  addTask,
  deleteTask,
  initializeTasks,
  setCategoryFilter,
  setSearchQuery,
  setStatusFilter,
  setTaskCompletion,
  state
} from "./state.js";
import { loadTasks, saveTasks } from "./storage.js";
import { readTaskForm, showTaskFormError } from "./task-form.js";
import { createTask } from "./task.js";

const app = document.querySelector("#app");

initializeTasks(loadTasks());

app.addEventListener("input", (event) => {
  const searchInput = event.target;

  if (!searchInput.matches("#task-search")) {
    return;
  }

  setSearchQuery(searchInput.value);
  renderTaskResults(app.querySelector("#task-results"), state);
});

app.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".task-delete-button[data-task-id]");

  if (!deleteButton) {
    return;
  }

  if (deleteTask(deleteButton.dataset.taskId)) {
    saveTasks(state.tasks);
    renderTaskResults(app.querySelector("#task-results"), state);
  }
});

app.addEventListener("change", (event) => {
  const control = event.target;

  if (control.matches("#category-filter")) {
    setCategoryFilter(control.value);
    renderTaskResults(app.querySelector("#task-results"), state);
    return;
  }

  if (control.matches("#status-filter")) {
    setStatusFilter(control.value);
    renderTaskResults(app.querySelector("#task-results"), state);
    return;
  }

  if (!control.matches(".task-checkbox[data-task-id]")) {
    return;
  }

  setTaskCompletion(control.dataset.taskId, control.checked);
  saveTasks(state.tasks);
  renderTaskResults(app.querySelector("#task-results"), state);
});

app.addEventListener("submit", (event) => {
  const form = event.target;

  if (!form.matches(".task-form")) {
    return;
  }

  event.preventDefault();

  try {
    addTask(createTask(readTaskForm(form)));
    saveTasks(state.tasks);
    form.reset();
    renderTaskResults(app.querySelector("#task-results"), state);
    app.querySelector("#task-title").focus();
  } catch (error) {
    showTaskFormError(form, error.message);
  }
});

renderApp(app, state);
