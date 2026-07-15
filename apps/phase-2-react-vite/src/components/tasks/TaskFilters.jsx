import FormField from './FormField.jsx'

function TaskFilters({ filters, onFilterChange }) {
  return (
    <section className="task-filters" aria-labelledby="task-filters-heading">
      <h2 className="visually-hidden" id="task-filters-heading">
        Filter tasks
      </h2>

      <FormField label="Search tasks" name="task-search">
        <input
          id="task-search"
          type="search"
          value={filters.searchQuery}
          onChange={(event) =>
            onFilterChange('searchQuery', event.target.value)
          }
          placeholder="Search by title"
          autoComplete="off"
        />
      </FormField>

      <FormField label="Category" name="category-filter">
        <select
          id="category-filter"
          value={filters.category}
          onChange={(event) => onFilterChange('category', event.target.value)}
        >
          <option value="all">All categories</option>
          <option value="home">Home</option>
          <option value="maintenance">Maintenance</option>
          <option value="shopping">Shopping</option>
        </select>
      </FormField>

      <FormField label="Status" name="status-filter">
        <select
          id="status-filter"
          value={filters.status}
          onChange={(event) => onFilterChange('status', event.target.value)}
        >
          <option value="all">All tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </FormField>
    </section>
  )
}

export default TaskFilters
