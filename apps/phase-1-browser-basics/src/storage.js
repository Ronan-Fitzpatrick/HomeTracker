export const STORAGE_KEY = "home-tracker:tasks";

export function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks === null) {
      return null;
    }

    const tasks = JSON.parse(savedTasks);
    return Array.isArray(tasks) ? tasks : null;
  } catch (error) {
    console.warn("HomeTracker could not read saved tasks.", error);
    return null;
  }
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
