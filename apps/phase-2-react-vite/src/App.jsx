import { useCallback, useState } from 'react'
import './App.css'
import Sidebar from './components/layout/Sidebar.jsx'
import TaskWorkspace from './components/tasks/TaskWorkspace.jsx'
import { seedTasks } from './data/seedTasks.js'

function App() {
  const [tasks, setTasks] = useState(seedTasks)

  const handleTaskAdd = useCallback((taskInput) => {
    const newTask = {
      id: `task_${crypto.randomUUID()}`,
      ...taskInput,
      isCompleted: false,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
  }, [])

  const handleTaskCompletionChange = useCallback((taskId, isCompleted) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted } : task,
      ),
    )
  }, [])

  const handleTaskDelete = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }, [])

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
