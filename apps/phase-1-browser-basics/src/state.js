import { createTask } from "./task.js";

function dateFromToday(dayOffset) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

const yesterday = dateFromToday(-1);
const today = dateFromToday(0);
const tomorrow = dateFromToday(1);

export const state = {
  tasks: [
    createTask({
      id: "task_laundry",
      title: "Laundry",
      category: "home",
      dueDate: today
    }),
    createTask({
      id: "task_weekly_shop",
      title: "Weekly shop",
      category: "shopping",
      dueDate: today,
      isCompleted: true
    }),
    createTask({
      id: "task_bins",
      title: "Put out the bins",
      category: "home",
      dueDate: tomorrow
    }),
    createTask({
      id: "task_boiler_service",
      title: "Book boiler service",
      category: "maintenance",
      dueDate: yesterday
    })
  ],
  filters: {
    category: "all",
    searchQuery: "",
    status: "all"
  }
};

export function setTaskCompletion(taskId, isCompleted) {
  const task = state.tasks.find((task) => task.id === taskId);

  if (!task) {
    return false;
  }

  task.isCompleted = isCompleted;
  return true;
}

export function addTask(task) {
  state.tasks.push(task);
}

export function deleteTask(taskId) {
  const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return false;
  }

  state.tasks.splice(taskIndex, 1);
  return true;
}

export function initializeTasks(tasks) {
  if (tasks !== null) {
    state.tasks = tasks;
  }
}
