import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/layout/Sidebar.jsx'
import ShoppingWorkspace from './components/shopping/ShoppingWorkspace.jsx'
import TaskWorkspace from './components/tasks/TaskWorkspace.jsx'
import { seedShoppingItems } from './data/seedShoppingItems.js'
import { seedTasks } from './data/seedTasks.js'
import { WORKSPACE, WORKSPACE_OPTIONS } from './data/workspaceOptions.js'
import { createTask, validateTasks } from './domain/task.js'
import {
  createShoppingItem,
  validateShoppingItems,
} from './domain/shoppingItem.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'

const TASK_STORAGE_KEY = 'home-tracker:tasks:v2'
const SHOPPING_STORAGE_KEY = 'home-tracker:shopping:v1'

const WORKSPACE_COPY = {
  [WORKSPACE.TODAY]: {
    title: 'Today',
    intro: 'See the household work that needs your attention today.',
    placeholder: 'Dashboard summaries will be built after the shopping workspace.',
  },
  [WORKSPACE.TASKS]: {
    title: 'Tasks',
    intro: 'Keep household jobs visible, organised, and moving.',
  },
  [WORKSPACE.SHOPPING]: {
    title: 'Shopping',
    intro: 'Keep a simple list of what the household needs.',
  },
}

function getWorkspaceFromHash() {
  const hashValue = window.location.hash.slice(1)
  const isKnownWorkspace = WORKSPACE_OPTIONS.some(
    (workspace) => workspace.value === hashValue,
  )

  return isKnownWorkspace ? hashValue : WORKSPACE.TASKS
}

function App() {
  const [activeWorkspace, setActiveWorkspace] = useState(getWorkspaceFromHash)
  const {
    value: tasks,
    setValue: setTasks,
    error: storageError,
  } = useLocalStorage({
    key: TASK_STORAGE_KEY,
    initialValue: seedTasks,
    validate: validateTasks,
  })
  const {
    value: shoppingItems,
    setValue: setShoppingItems,
    error: shoppingStorageError,
  } = useLocalStorage({
    key: SHOPPING_STORAGE_KEY,
    initialValue: seedShoppingItems,
    validate: validateShoppingItems,
  })
  const workspaceCopy = WORKSPACE_COPY[activeWorkspace]

  useEffect(() => {
    function handleHashChange() {
      setActiveWorkspace(getWorkspaceFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

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

  function handleShoppingItemAdd(itemInput) {
    const newItem = createShoppingItem(itemInput)
    setShoppingItems((currentItems) => [...currentItems, newItem])
  }

  function handleShoppingItemBoughtChange(itemId, isBought) {
    setShoppingItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, isBought } : item,
      ),
    )
  }

  function handleShoppingItemDelete(itemId) {
    setShoppingItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    )
  }

  function handleClearBoughtItems() {
    setShoppingItems((currentItems) =>
      currentItems.filter((item) => !item.isBought),
    )
  }

  return (
    <div className="app-layout">
      <Sidebar activeWorkspace={activeWorkspace} />

      <main className="app-shell" id={activeWorkspace}>
        <header className="app-header">
          <p className="eyebrow">HomeTracker · Phase 2</p>
          <h1>{workspaceCopy.title}</h1>
          <p className="intro">{workspaceCopy.intro}</p>
        </header>

        {activeWorkspace === WORKSPACE.TASKS ? (
          <>
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
          </>
        ) : activeWorkspace === WORKSPACE.SHOPPING ? (
          <>
            {shoppingStorageError ? (
              <p className="storage-alert" role="alert">
                {shoppingStorageError.operation === 'read'
                  ? 'Saved shopping data was invalid. The default items were restored.'
                  : 'Shopping items are available for this session, but changes could not be saved.'}
              </p>
            ) : null}

            <ShoppingWorkspace
              items={shoppingItems}
              onItemAdd={handleShoppingItemAdd}
              onItemBoughtChange={handleShoppingItemBoughtChange}
              onItemDelete={handleShoppingItemDelete}
              onClearBought={handleClearBoughtItems}
            />
          </>
        ) : (
          <p className="workspace-placeholder">{workspaceCopy.placeholder}</p>
        )}
      </main>
    </div>
  )
}

export default App
