import { renderApp } from "./render.js";
import { setTaskCompletion, state } from "./state.js";

const app = document.querySelector("#app");

app.addEventListener("change", (event) => {
  const checkbox = event.target;

  if (!checkbox.matches(".task-checkbox[data-task-id]")) {
    return;
  }

  setTaskCompletion(checkbox.dataset.taskId, checkbox.checked);
  renderApp(app, state);
});

renderApp(app, state);
