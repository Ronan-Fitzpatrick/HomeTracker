export const TASK_CATEGORIES = ["home", "maintenance", "shopping"];

export function createTask({
  id = `task_${crypto.randomUUID()}`,
  title,
  category,
  dueDate = null,
  isCompleted = false
}) {
  if (!title.trim()) {
    throw new Error("Enter a task title.");
  }

  if (!TASK_CATEGORIES.includes(category)) {
    throw new Error("Choose a valid task category.");
  }

  return {
    id,
    title: title.trim(),
    category,
    dueDate,
    isCompleted,
    createdAt: new Date().toISOString()
  };
}
