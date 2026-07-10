export const TASK_CATEGORIES = ["home", "maintenance", "shopping"];

export function createTask({
  id,
  title,
  category,
  dueDate = null,
  isCompleted = false
}) {
  return {
    id,
    title,
    category,
    dueDate,
    isCompleted,
    createdAt: new Date().toISOString()
  };
}
