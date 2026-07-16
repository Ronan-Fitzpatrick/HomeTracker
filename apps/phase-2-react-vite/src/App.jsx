import './App.css'
import Sidebar from './components/layout/Sidebar.jsx'
import TaskWorkspace from './components/tasks/TaskWorkspace.jsx'
import { seedTasks } from './data/seedTasks.js'
import { createTask, validateTasks } from './domain/task.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'

const TASK_STORAGE_KEY = 'home-tracker:tasks:v2'

function App() {
  const {
    value: tasks,
    setValue: setTasks,
    error: storageError,
  } = useLocalStorage({
    key: TASK_STORAGE_KEY,
    initialValue: seedTasks,
    validate: validateTasks,
  })

  function handleTaskAdd(taskInput) {
    const newTask = createTask(taskInput)

    setTasks((currentTasks) => [...currentTasks, newTask])
  }

  function handleTaskCompletionChange(taskId, isCompleted) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted } : task,
      ),
    )
  }

  function handleTaskDelete(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-shell" id="tasks">
        <header className="app-header">
          <p className="eyebrow">HomeTracker · Phase 2</p>
          <h1>Tasks</h1>
          <p className="intro">
            Keep household jobs visible, organised, and moving.
          </p>
        </header>

        {storageError ? (
          <p className="storage-alert" role="alert">
            {storageError.operation === 'read'
              ? 'Saved task data was invalid. The default tasks were restored.'
              : 'Tasks are available for this session, but changes could not be saved.'}
          </p>
        ) : null}

        <TaskWorkspace
          tasks={tasks}
          onTaskAdd={handleTaskAdd}
          onTaskCompletionChange={handleTaskCompletionChange}
          onTaskDelete={handleTaskDelete}
        />
      </main>
    </div>
  )
}

export default App
