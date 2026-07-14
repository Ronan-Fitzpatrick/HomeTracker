import { renderApp, renderTaskResults, showSnackbar } from "./render.js";
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

let loadError = false;

try {
  initializeTasks(loadTasks());
} catch (error) {
  console.warn("HomeTracker could not load saved tasks.", error);
  loadError = true;
}

function saveCurrentTasks() {
  if (!saveTasks(state.tasks)) {
    showSnackbar(app, "Something went wrong. Your changes could not be saved.");
    return false;
  }

  return true;
}

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
    saveCurrentTasks();
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
  saveCurrentTasks();
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
    saveCurrentTasks();
    form.reset();
    renderTaskResults(app.querySelector("#task-results"), state);
    app.querySelector("#task-title").focus();
  } catch (error) {
    showTaskFormError(form, error.message);
  }
});

renderApp(app, state);

if (loadError) {
  showSnackbar(app, "Something went wrong. Saved tasks could not be loaded.");
}
