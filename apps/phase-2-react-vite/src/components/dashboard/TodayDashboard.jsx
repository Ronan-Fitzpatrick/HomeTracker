import DashboardCard from './DashboardCard.jsx'
import { getDepartmentLabel } from '../../data/shoppingOptions.js'

function getTaskCountTone(count) {
  if (count === 0) return 'clear'
  if (count <= 2) return 'info'
  if (count <= 4) return 'warning'
  return 'danger'
}

function TodayDashboard({ summary }) {
  const cards = [
    {
      id: 'overdue-tasks',
      label: 'Overdue tasks',
      count: summary.overdueTaskCount,
      description: 'Active tasks that need attention.',
      emptyMessage: 'Nothing is overdue.',
      href: '#tasks',
      tone: getTaskCountTone(summary.overdueTaskCount),
      items: summary.overdueTasks.map((task) => ({
        id: task.id,
        name: task.title,
        meta: `${task.category} · Due ${task.dueDate}`,
      })),
    },
    {
      id: 'tasks-due-today',
      label: 'Tasks due today',
      count: summary.dueTodayTaskCount,
      description: 'Active tasks scheduled for today.',
      emptyMessage: 'No tasks are due today.',
      href: '#tasks',
      tone: getTaskCountTone(summary.dueTodayTaskCount),
      items: summary.dueTodayTasks.map((task) => ({
        id: task.id,
        name: task.title,
        meta: task.category,
      })),
    },
    {
      id: 'shopping-remaining',
      label: 'Shopping remaining',
      count: summary.remainingShoppingCount,
      description: 'Items that have not been bought yet.',
      emptyMessage: 'The shopping list is complete.',
      href: '#shopping',
      tone: summary.remainingShoppingCount === 0 ? 'clear' : 'info',
      items: summary.remainingShoppingItems.map((item) => ({
        id: item.id,
        name: item.name,
        meta: `${getDepartmentLabel(item.category, item.department)} · Qty ${item.quantity}`,
      })),
    },
  ]

  return (
    <section className="dashboard-grid" aria-label="Household summary">
      {cards.map((card) => (
        <DashboardCard key={card.id} {...card} />
      ))}
    </section>
  )
}

export default TodayDashboard
