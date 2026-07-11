import { TASK_CATEGORIES } from "./task.js";

function createField(labelText, input) {
  const field = document.createElement("div");
  const label = document.createElement("label");

  field.className = "form-field";
  label.htmlFor = input.id;
  label.textContent = labelText;
  field.append(label, input);

  return field;
}

export function createTaskForm() {
  const form = document.createElement("form");
  const title = document.createElement("input");
  const category = document.createElement("select");
  const dueDate = document.createElement("input");
  const submit = document.createElement("button");
  const error = document.createElement("p");

  form.className = "task-form";
  form.noValidate = true;

  title.id = "task-title";
  title.name = "title";
  title.type = "text";
  title.required = true;
  title.autocomplete = "off";

  category.id = "task-category";
  category.name = "category";
  for (const taskCategory of TASK_CATEGORIES) {
    const option = document.createElement("option");
    option.value = taskCategory;
    option.textContent = taskCategory;
    category.append(option);
  }

  dueDate.id = "task-due-date";
  dueDate.name = "dueDate";
  dueDate.type = "date";

  submit.type = "submit";
  submit.textContent = "Add task";

  error.className = "form-error";
  error.dataset.formError = "";
  error.setAttribute("aria-live", "polite");

  form.append(
    createField("Task title", title),
    createField("Category", category),
    createField("Due date (optional)", dueDate),
    submit,
    error
  );

  return form;
}

export function readTaskForm(form) {
  const formData = new FormData(form);

  return {
    title: formData.get("title").trim(),
    category: formData.get("category"),
    dueDate: formData.get("dueDate") || null
  };
}

export function showTaskFormError(form, message) {
  form.querySelector("[data-form-error]").textContent = message;
}
