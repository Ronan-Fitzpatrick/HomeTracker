import { TASK_CATEGORY } from './taskOptions.js'
import { createTask } from '../domain/task.js'

function dateFromToday(dayOffset) {
  const date = new Date()
  date.setDate(date.getDate() + dayOffset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const seedTasks = [
  createTask({
    id: 'task_laundry',
    title: 'Laundry',
    category: TASK_CATEGORY.HOME,
    dueDate: dateFromToday(0),
    isCompleted: false,
  }),
  createTask({
    id: 'task_weekly_shop',
    title: 'Weekly shop',
    category: TASK_CATEGORY.SHOPPING,
    dueDate: dateFromToday(30),
    isCompleted: true,
  }),
  createTask({
    id: 'task_bins',
    title: 'Put out the bins',
    category: TASK_CATEGORY.HOME,
    dueDate: dateFromToday(14),
    isCompleted: false,
  }),
  createTask({
    id: 'task_boiler_service',
    title: 'Book boiler service',
    category: TASK_CATEGORY.MAINTENANCE,
    dueDate: dateFromToday(-3),
    isCompleted: false,
  }),
  createTask({
    id: 'task_smoke_alarm',
    title: 'Test smoke alarms',
    category: TASK_CATEGORY.MAINTENANCE,
    dueDate: dateFromToday(-10),
    isCompleted: false,
  }),
  createTask({
    id: 'task_recycling',
    title: 'Sort recycling',
    category: TASK_CATEGORY.HOME,
    dueDate: dateFromToday(-1),
    isCompleted: false,
  }),
  createTask({
    id: 'task_clean_kitchen',
    title: 'Clean the kitchen',
    category: TASK_CATEGORY.HOME,
    dueDate: dateFromToday(0),
    isCompleted: false,
  }),
  createTask({
    id: 'task_bathroom_supplies',
    title: 'Buy bathroom supplies',
    category: TASK_CATEGORY.SHOPPING,
    dueDate: dateFromToday(3),
    isCompleted: false,
  }),
  createTask({
    id: 'task_garden',
    title: 'Tidy the garden',
    category: TASK_CATEGORY.HOME,
    dueDate: dateFromToday(7),
    isCompleted: false,
  }),
  createTask({
    id: 'task_gutter_check',
    title: 'Check the gutters',
    category: TASK_CATEGORY.MAINTENANCE,
    dueDate: dateFromToday(21),
    isCompleted: false,
  }),
  createTask({
    id: 'task_light_bulbs',
    title: 'Buy spare light bulbs',
    category: TASK_CATEGORY.SHOPPING,
    dueDate: dateFromToday(28),
    isCompleted: false,
  }),
  createTask({
    id: 'task_fridge',
    title: 'Clean the fridge',
    category: TASK_CATEGORY.HOME,
    dueDate: dateFromToday(7),
    isCompleted: true,
  }),
]
