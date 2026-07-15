import TaskItem from './TaskItem.jsx'

function TaskGroup({
  tasks,
  title,
  onTaskCompletionChange,
  onTaskDelete,
}) {
  return (
    <section className="task-group">
      <h2>{title}</h2>
      <ul className="task-list" aria-label={`${title} tasks`}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onCompletionChange={onTaskCompletionChange}
            onDelete={onTaskDelete}
          />
        ))}
      </ul>
    </section>
  )
}

export default TaskGroup
