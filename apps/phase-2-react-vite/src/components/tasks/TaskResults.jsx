import TaskGroup from './TaskGroup.jsx'

function getToday() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function groupTasks(tasks) {
  const today = getToday()
  const groups = {
    Overdue: [],
    Today: [],
    Upcoming: [],
    Completed: [],
  }

  for (const task of tasks) {
    if (task.isCompleted) {
      groups.Completed.push(task)
    } else if (task.dueDate && task.dueDate < today) {
      groups.Overdue.push(task)
    } else if (task.dueDate === today) {
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
      filters.category === 'all' || task.category === filters.category
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'active' && !task.isCompleted) ||
      (filters.status === 'completed' && task.isCompleted)

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
