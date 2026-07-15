function TaskItem({ task, onCompletionChange, onDelete }) {
  const taskMeta = task.dueDate
    ? `${task.category} · ${task.dueDate}`
    : task.category

  return (
    <li className="task-item">
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.isCompleted}
        aria-label={`Mark ${task.title} ${task.isCompleted ? 'incomplete' : 'complete'}`}
        onChange={(event) => onCompletionChange(task.id, event.target.checked)}
      />
      <div className="task-content">
        <span className="task-title">{task.title}</span>
        <span className="task-meta">{taskMeta}</span>
      </div>
      <button
        className="task-delete-button"
        type="button"
        aria-label={`Delete ${task.title}`}
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem
