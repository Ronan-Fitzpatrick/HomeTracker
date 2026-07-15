import { useState } from 'react'
import { ALL_TASKS_FILTER } from '../../data/taskOptions.js'
import TaskFilters from './TaskFilters.jsx'
import TaskForm from './TaskForm.jsx'
import TaskResults from './TaskResults.jsx'

const INITIAL_FILTERS = {
  searchQuery: '',
  category: ALL_TASKS_FILTER,
  status: ALL_TASKS_FILTER,
}

function TaskWorkspace({
  tasks,
  onTaskAdd,
  onTaskCompletionChange,
  onTaskDelete,
}) {
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  function handleFilterChange(filterName, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value,
    }))
  }

  return (
    <section className="task-workspace" aria-labelledby="task-workspace-heading">
      <h2 className="visually-hidden" id="task-workspace-heading">
        Task workspace
      </h2>
      <TaskForm onTaskAdd={onTaskAdd} />
      <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
      <TaskResults
        filters={filters}
        tasks={tasks}
        onTaskCompletionChange={onTaskCompletionChange}
        onTaskDelete={onTaskDelete}
      />
    </section>
  )
}

export default TaskWorkspace
