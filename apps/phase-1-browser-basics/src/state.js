import { createTask } from "./task.js";

function dateFromToday(dayOffset) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const threeDaysAgo = dateFromToday(-3);
const tenDaysAgo = dateFromToday(-10);
const yesterday = dateFromToday(-1);
const today = dateFromToday(0);
const threeDaysFromToday = dateFromToday(3);
const oneWeekFromToday = dateFromToday(7);
const twoWeeksFromToday = dateFromToday(14);
const threeWeeksFromToday = dateFromToday(21);
const fourWeeksFromToday = dateFromToday(28);
const oneMonthFromToday = dateFromToday(30);

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
      dueDate: oneMonthFromToday,
      isCompleted: true
    }),
    createTask({
      id: "task_bins",
      title: "Put out the bins",
      category: "home",
      dueDate: twoWeeksFromToday
    }),
    createTask({
      id: "task_boiler_service",
      title: "Book boiler service",
      category: "maintenance",
      dueDate: threeDaysAgo
    }),
    createTask({
      id: "task_smoke_alarm",
      title: "Test smoke alarms",
      category: "maintenance",
      dueDate: tenDaysAgo
    }),
    createTask({
      id: "task_recycling",
      title: "Sort recycling",
      category: "home",
      dueDate: yesterday
    }),
    createTask({
      id: "task_clean_kitchen",
      title: "Clean the kitchen",
      category: "home",
      dueDate: today
    }),
    createTask({
      id: "task_bathroom_supplies",
      title: "Buy bathroom supplies",
      category: "shopping",
      dueDate: threeDaysFromToday
    }),
    createTask({
      id: "task_garden",
      title: "Tidy the garden",
      category: "home",
      dueDate: oneWeekFromToday
    }),
    createTask({
      id: "task_gutter_check",
      title: "Check the gutters",
      category: "maintenance",
      dueDate: threeWeeksFromToday
    }),
    createTask({
      id: "task_light_bulbs",
      title: "Buy spare light bulbs",
      category: "shopping",
      dueDate: fourWeeksFromToday
    }),
    createTask({
      id: "task_fridge",
      title: "Clean the fridge",
      category: "home",
      dueDate: oneWeekFromToday,
      isCompleted: true
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

export function setCategoryFilter(category) {
  state.filters.category = category;
}

export function setSearchQuery(searchQuery) {
  state.filters.searchQuery = searchQuery;
}

export function setStatusFilter(status) {
  state.filters.status = status;
}

export function initializeTasks(tasks) {
  if (tasks !== null) {
    state.tasks = tasks;
  }
}
