import { createTaskForm } from "./task-form.js";

let snackbarTimeoutId;

function createSnackbar() {
  const snackbar = document.createElement("div");
  const message = document.createElement("p");
  const dismissButton = document.createElement("button");

  snackbar.className = "snackbar";
  snackbar.hidden = true;
  snackbar.setAttribute("role", "alert");
  message.className = "snackbar-message";
  dismissButton.type = "button";
  dismissButton.textContent = "Dismiss";
  dismissButton.addEventListener("click", () => {
    snackbar.hidden = true;
    clearTimeout(snackbarTimeoutId);
  });

  snackbar.append(message, dismissButton);
  return snackbar;
}

export function showSnackbar(root, message) {
  const snackbar = root.querySelector(".snackbar");

  snackbar.querySelector(".snackbar-message").textContent = message;
  snackbar.hidden = false;
  clearTimeout(snackbarTimeoutId);
  snackbarTimeoutId = setTimeout(() => {
    snackbar.hidden = true;
  }, 5000);
}

function createFilterField(labelText, control) {
  const field = document.createElement("div");
  const label = document.createElement("label");

  field.className = "filter-field";
  label.htmlFor = control.id;
  label.textContent = labelText;
  field.append(label, control);

  return field;
}

function createSelect(id, value, options) {
  const select = document.createElement("select");

  select.id = id;

  for (const [optionValue, optionLabel] of options) {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionLabel;
    option.selected = optionValue === value;
    select.append(option);
  }

  return select;
}

function createTaskFilters(filters) {
  const controls = document.createElement("section");
  const heading = document.createElement("h2");
  const search = document.createElement("input");
  const category = createSelect("category-filter", filters.category, [
    ["all", "All categories"],
    ["home", "Home"],
    ["maintenance", "Maintenance"],
    ["shopping", "Shopping"]
  ]);
  const status = createSelect("status-filter", filters.status, [
    ["all", "All tasks"],
    ["active", "Active"],
    ["completed", "Completed"]
  ]);

  controls.className = "task-filters";
  heading.className = "visually-hidden";
  heading.id = "task-filters-heading";
  heading.textContent = "Filter tasks";
  controls.setAttribute("aria-labelledby", heading.id);

  search.id = "task-search";
  search.type = "search";
  search.autocomplete = "off";
  search.value = filters.searchQuery;
  search.placeholder = "Search by title";

  controls.append(
    heading,
    createFilterField("Search tasks", search),
    createFilterField("Category", category),
    createFilterField("Status", status)
  );

  return controls;
}

function createTaskElement(task) {
  const item = document.createElement("li");
  const checkbox = document.createElement("input");
  const content = document.createElement("div");
  const title = document.createElement("span");
  const meta = document.createElement("span");
  const deleteButton = document.createElement("button");

  item.className = "task-item";
  checkbox.className = "task-checkbox";
  content.className = "task-content";
  title.className = "task-title";
  meta.className = "task-meta";
  deleteButton.className = "task-delete-button";

  checkbox.type = "checkbox";
  checkbox.checked = task.isCompleted;
  checkbox.dataset.taskId = task.id;
  checkbox.setAttribute(
    "aria-label",
    `Mark ${task.title} ${task.isCompleted ? "incomplete" : "complete"}`
  );
  title.textContent = task.title;
  meta.textContent = task.dueDate
    ? `${task.category} · ${task.dueDate}`
    : task.category;

  deleteButton.type = "button";
  deleteButton.dataset.taskId = task.id;
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

  content.append(title, meta);
  item.append(checkbox, content, deleteButton);

  return item;
}

function groupTasks(tasks, today) {
  const groups = {
    overdue: [],
    today: [],
    upcoming: [],
    completed: []
  };

  for (const task of tasks) {
    if (task.isCompleted) {
      groups.completed.push(task);
    } else if (task.dueDate && task.dueDate < today) {
      groups.overdue.push(task);
    } else if (task.dueDate === today) {
      groups.today.push(task);
    } else {
      groups.upcoming.push(task);
    }
  }

  return groups;
}

function filterTasks(tasks, filters) {
  const query = filters.searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch =
      query === "" || task.title.toLowerCase().includes(query);
    const matchesCategory =
      filters.category === "all" || task.category === filters.category;
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" && !task.isCompleted) ||
      (filters.status === "completed" && task.isCompleted);

    return matchesSearch && matchesCategory && matchesStatus;
  });
}

function createTaskGroup(title, tasks) {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  const list = document.createElement("ul");

  heading.textContent = title;
  list.className = "task-list";

  for (const task of tasks) {
    list.append(createTaskElement(task));
  }

  section.append(heading, list);

  return section;
}

export function renderTaskResults(root, state) {
  const today = new Date().toISOString().slice(0, 10);
  const filteredTasks = filterTasks(state.tasks, state.filters);
  const taskGroups = groupTasks(filteredTasks, today);

  if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-results";
    emptyMessage.textContent = "No tasks match your search and filters.";
    root.replaceChildren(emptyMessage);
  } else {
    root.replaceChildren(
      createTaskGroup("Overdue", taskGroups.overdue),
      createTaskGroup("Today", taskGroups.today),
      createTaskGroup("Upcoming", taskGroups.upcoming),
      createTaskGroup("Completed", taskGroups.completed)
    );
  }
}

export function renderApp(root, state) {
  const section = document.createElement("section");
  const heading = document.createElement("h1");
  const results = document.createElement("div");

  heading.id = "task-list-heading";
  heading.textContent = "Tasks";
  results.id = "task-results";
  section.setAttribute("aria-labelledby", heading.id);

  section.append(
    heading,
    createTaskForm(),
    createTaskFilters(state.filters),
    results
  );

  root.replaceChildren(section, createSnackbar());
  renderTaskResults(results, state);
}
