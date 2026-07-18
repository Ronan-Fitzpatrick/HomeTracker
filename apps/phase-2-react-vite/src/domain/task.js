import { TASK_CATEGORY } from '../data/taskOptions.js'

const TASK_CATEGORIES = Object.values(TASK_CATEGORY)
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export function createTask({
  id = `task_${crypto.randomUUID()}`,
  title,
  category,
  dueDate = null,
  isCompleted = false,
  createdAt = new Date().toISOString(),
}) {
  const task = {
    id,
    title: typeof title === 'string' ? title.trim() : title,
    category,
    dueDate,
    isCompleted,
    createdAt,
  }

  validateTask(task)
  return task
}

function validateTask(task) {
  const isObject =
    task !== null && typeof task === 'object' && !Array.isArray(task)

  if (
    !isObject ||
    typeof task.id !== 'string' ||
    task.id.length === 0 ||
    typeof task.title !== 'string' ||
    task.title.trim().length === 0 ||
    !TASK_CATEGORIES.includes(task.category) ||
    (task.dueDate !== null &&
      (typeof task.dueDate !== 'string' ||
        !DATE_PATTERN.test(task.dueDate))) ||
    typeof task.isCompleted !== 'boolean' ||
    typeof task.createdAt !== 'string' ||
    Number.isNaN(Date.parse(task.createdAt))
  ) {
    throw new Error('Task data is invalid.')
  }

  return task
}

export function validateTasks(tasks) {
  if (!Array.isArray(tasks)) {
    throw new Error('Saved tasks must be an array.')
  }

  const taskIds = new Set()

  for (const task of tasks) {
    validateTask(task)

    if (taskIds.has(task.id)) {
      throw new Error(`Saved tasks contain duplicate ID "${task.id}".`)
    }

    taskIds.add(task.id)
  }

  return tasks
}

export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function isTaskOverdue(task, today = getLocalDateString()) {
  return !task.isCompleted && task.dueDate !== null && task.dueDate < today
}

export function isTaskDueToday(task, today = getLocalDateString()) {
  return !task.isCompleted && task.dueDate === today
}
