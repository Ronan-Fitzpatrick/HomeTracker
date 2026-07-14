import { TASK_CATEGORIES } from "./task.js";

export const STORAGE_KEY = "home-tracker:tasks:v2";

function isValidStoredTask(task) {
  return (
    task !== null &&
    typeof task === "object" &&
    typeof task.id === "string" &&
    task.id.length > 0 &&
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    TASK_CATEGORIES.includes(task.category) &&
    (task.dueDate === null || /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)) &&
    typeof task.isCompleted === "boolean" &&
    typeof task.createdAt === "string"
  );
}

function validateStoredTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error("Saved tasks must be an array.");
  }

  const taskIds = new Set();

  for (const task of tasks) {
    if (!isValidStoredTask(task)) {
      throw new Error("Saved task data is invalid.");
    }

    if (taskIds.has(task.id)) {
      throw new Error(`Saved tasks contain duplicate ID "${task.id}".`);
    }

    taskIds.add(task.id);
  }

  return tasks;
}

export function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (savedTasks === null) {
    return null;
  }

  return validateStoredTasks(JSON.parse(savedTasks));
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.warn("HomeTracker could not save tasks.", error);
    return false;
  }
}
