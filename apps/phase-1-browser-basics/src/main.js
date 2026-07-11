import { renderApp } from "./render.js";
import {
  addTask,
  initializeTasks,
  setTaskCompletion,
  state
} from "./state.js";
import { loadTasks, saveTasks } from "./storage.js";
import { readTaskForm, showTaskFormError } from "./task-form.js";
import { createTask } from "./task.js";

const app = document.querySelector("#app");

initializeTasks(loadTasks());

app.addEventListener("change", (event) => {
  const checkbox = event.target;

  if (!checkbox.matches(".task-checkbox[data-task-id]")) {
    return;
  }

  setTaskCompletion(checkbox.dataset.taskId, checkbox.checked);
  saveTasks(state.tasks);
  renderApp(app, state);
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
    renderApp(app, state);
    app.querySelector("#task-title").focus();
  } catch (error) {
    showTaskFormError(form, error.message);
  }
});

renderApp(app, state);
