function dateFromToday(dayOffset) {
  const date = new Date()
  date.setDate(date.getDate() + dayOffset)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const seedTasks = [
  {
    id: 'task_laundry',
    title: 'Laundry',
    category: 'home',
    dueDate: dateFromToday(0),
    isCompleted: false,
  },
  {
    id: 'task_weekly_shop',
    title: 'Weekly shop',
    category: 'shopping',
    dueDate: dateFromToday(30),
    isCompleted: true,
  },
  {
    id: 'task_bins',
    title: 'Put out the bins',
    category: 'home',
    dueDate: dateFromToday(14),
    isCompleted: false,
  },
  {
    id: 'task_boiler_service',
    title: 'Book boiler service',
    category: 'maintenance',
    dueDate: dateFromToday(-3),
    isCompleted: false,
  },
  {
    id: 'task_smoke_alarm',
    title: 'Test smoke alarms',
    category: 'maintenance',
    dueDate: dateFromToday(-10),
    isCompleted: false,
  },
  {
    id: 'task_recycling',
    title: 'Sort recycling',
    category: 'home',
    dueDate: dateFromToday(-1),
    isCompleted: false,
  },
  {
    id: 'task_clean_kitchen',
    title: 'Clean the kitchen',
    category: 'home',
    dueDate: dateFromToday(0),
    isCompleted: false,
  },
  {
    id: 'task_bathroom_supplies',
    title: 'Buy bathroom supplies',
    category: 'shopping',
    dueDate: dateFromToday(3),
    isCompleted: false,
  },
  {
    id: 'task_garden',
    title: 'Tidy the garden',
    category: 'home',
    dueDate: dateFromToday(7),
    isCompleted: false,
  },
  {
    id: 'task_gutter_check',
    title: 'Check the gutters',
    category: 'maintenance',
    dueDate: dateFromToday(21),
    isCompleted: false,
  },
  {
    id: 'task_light_bulbs',
    title: 'Buy spare light bulbs',
    category: 'shopping',
    dueDate: dateFromToday(28),
    isCompleted: false,
  },
  {
    id: 'task_fridge',
    title: 'Clean the fridge',
    category: 'home',
    dueDate: dateFromToday(7),
    isCompleted: true,
  },
]
