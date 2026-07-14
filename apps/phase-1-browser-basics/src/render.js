import { createTaskForm } from "./task-form.js";

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

export function renderApp(root, state) {
  const section = document.createElement("section");
  const heading = document.createElement("h1");
  const today = new Date().toISOString().slice(0, 10);
  const taskGroups = groupTasks(state.tasks, today);

  heading.id = "task-list-heading";
  heading.textContent = "Tasks";
  section.setAttribute("aria-labelledby", heading.id);

  section.append(
    heading,
    createTaskForm(),
    createTaskGroup("Overdue", taskGroups.overdue),
    createTaskGroup("Today", taskGroups.today),
    createTaskGroup("Upcoming", taskGroups.upcoming),
    createTaskGroup("Completed", taskGroups.completed)
  );
  root.replaceChildren(section);
}
