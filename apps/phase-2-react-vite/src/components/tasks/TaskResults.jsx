import TaskGroup from './TaskGroup.jsx'
import { ALL_TASKS_FILTER, TASK_STATUS } from '../../data/taskOptions.js'
import {
  getLocalDateString,
  isTaskDueToday,
  isTaskOverdue,
} from '../../domain/task.js'

function groupTasks(tasks) {
  const today = getLocalDateString()
  const groups = {
    Overdue: [],
    Today: [],
    Upcoming: [],
    Completed: [],
  }

  for (const task of tasks) {
    if (task.isCompleted) {
      groups.Completed.push(task)
    } else if (isTaskOverdue(task, today)) {
      groups.Overdue.push(task)
    } else if (isTaskDueToday(task, today)) {
      groups.Today.push(task)
    } else {
      groups.Upcoming.push(task)
    }
  }

  return groups
}

function filterTasks(tasks, filters) {
  const searchQuery = filters.searchQuery.trim().toLowerCase()

  return tasks.filter((task) => {
    const matchesSearch =
      searchQuery === '' || task.title.toLowerCase().includes(searchQuery)
    const matchesCategory =
      filters.category === ALL_TASKS_FILTER || task.category === filters.category
    const matchesStatus =
      filters.status === ALL_TASKS_FILTER ||
      (filters.status === TASK_STATUS.ACTIVE && !task.isCompleted) ||
      (filters.status === TASK_STATUS.COMPLETED && task.isCompleted)

    return matchesSearch && matchesCategory && matchesStatus
  })
}

function TaskResults({
  filters,
  tasks,
  onTaskCompletionChange,
  onTaskDelete,
}) {
  const filteredTasks = filterTasks(tasks, filters)
  const taskGroups = groupTasks(filteredTasks)

  if (filteredTasks.length === 0) {
    return (
      <p className="empty-results">
        No tasks match your search and filters.
      </p>
    )
  }

  return (
    <div className="task-results">
      {Object.entries(taskGroups).map(([title, groupedTasks]) => (
        <TaskGroup
          key={title}
          title={title}
          tasks={groupedTasks}
          onTaskCompletionChange={onTaskCompletionChange}
          onTaskDelete={onTaskDelete}
        />
      ))}
    </div>
  )
}

export default TaskResults
